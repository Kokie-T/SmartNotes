using System.Net.Http.Json;
using System.Text.Json;

namespace Backend.Services
{
    public class GeminiService
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;

        // You can override these in appsettings.json:
        // "GeminiSettings": { "ApiKey": "...", "Model": "gemini-flash-latest", "ApiVersion": "v1beta" }
        private readonly string _apiVersion;
        private string _modelName;

        public GeminiService(HttpClient http, IConfiguration config)
        {
            _http = http;

            _apiKey = config["GeminiSettings:ApiKey"] ?? "";
            if (string.IsNullOrWhiteSpace(_apiKey))
                throw new InvalidOperationException("Gemini API key is missing. Set GeminiSettings:ApiKey.");

            _apiVersion = config["GeminiSettings:ApiVersion"] ?? "v1beta";

            // Default model: use a stable alias (these change often, but this one is commonly suggested)
            // If this fails, we auto-fallback by calling ListModels.
            _modelName = config["GeminiSettings:Model"] ?? "gemini-flash-latest"; // :contentReference[oaicite:1]{index=1}
        }

        public Task<string> GenerateNotesAsync(string subject)
        {
            var clean = Normalize(subject);

            var prompt =
                "You are a helpful study assistant.\n" +
                "Write detailed, structured study notes for the topic below.\n" +
                "Rules:\n" +
                "- Use clear headings\n" +
                "- Use bullet points\n" +
                "- Include definitions and simple examples\n" +
                "- Keep it easy to study\n\n" +
                $"TOPIC: {clean}";

            return GenerateTextWithFallbackAsync(prompt);
        }

        public Task<string> GenerateQuizAsync(string subject)
        {
            var clean = Normalize(subject);

            var prompt =
                "You are a quiz generator.\n" +
                "Create exactly 5 quiz questions for the topic below.\n" +
                "Return STRICT JSON only (no markdown), as an array of objects:\n" +
                "[{\"question\":\"...\",\"answer\":\"...\"}]\n\n" +
                $"TOPIC: {clean}";

            return GenerateTextWithFallbackAsync(prompt);
        }

        // ------------------------
        // Core call + fallback
        // ------------------------

        private async Task<string> GenerateTextWithFallbackAsync(string prompt)
        {
            // Try configured/default model first
            var firstTry = await TryGenerateAsync(_modelName, prompt);
            if (firstTry.ok) return firstTry.text!;

            // If model not found / not supported -> list models and pick something valid
            if (firstTry.isModelNotFound)
            {
                var chosen = await PickWorkingModelAsync(preferFlash: true);
                _modelName = chosen; // cache choice for future calls

                var secondTry = await TryGenerateAsync(_modelName, prompt);
                if (secondTry.ok) return secondTry.text!;
            }

            // If still failing, throw the clearest error we have
            throw new InvalidOperationException(firstTry.errorMessage ?? "Gemini request failed.");
        }

        private async Task<(bool ok, string? text, bool isModelNotFound, string? errorMessage)> TryGenerateAsync(string modelName, string prompt)
        {
            var url = $"https://generativelanguage.googleapis.com/{_apiVersion}/models/{modelName}:generateContent?key={_apiKey}";

            var body = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[] { new { text = prompt } }
                    }
                }
            };

            using var res = await _http.PostAsJsonAsync(url, body);

            var raw = await res.Content.ReadAsStringAsync();

            if (res.IsSuccessStatusCode)
            {
                var text = ExtractText(raw);
                if (string.IsNullOrWhiteSpace(text))
                    return (false, null, false, "Gemini returned an empty response.");

                return (true, text, false, null);
            }

            // Detect “model not found / not supported” patterns
            var modelNotFound =
                res.StatusCode == System.Net.HttpStatusCode.NotFound &&
                raw.Contains("is not found for API version", StringComparison.OrdinalIgnoreCase);

            // Bubble up useful error text
            var msg = $"Gemini error {(int)res.StatusCode}: {raw}";
            Console.WriteLine("🔥 Gemini call failed:");
            Console.WriteLine(msg);

            return (false, null, modelNotFound, msg);
        }

        private async Task<string> PickWorkingModelAsync(bool preferFlash)
        {
            var url = $"https://generativelanguage.googleapis.com/{_apiVersion}/models?key={_apiKey}";
            using var res = await _http.GetAsync(url);

            var raw = await res.Content.ReadAsStringAsync();
            if (!res.IsSuccessStatusCode)
                throw new InvalidOperationException($"ListModels failed {(int)res.StatusCode}: {raw}");

            using var doc = JsonDocument.Parse(raw);

            // Response shape typically: { "models": [ { "name": "models/...", "supportedGenerationMethods": [...] }, ... ] }
            if (!doc.RootElement.TryGetProperty("models", out var modelsEl) || modelsEl.ValueKind != JsonValueKind.Array)
                throw new InvalidOperationException("ListModels response did not contain a 'models' array.");

            var candidates = new List<(string modelName, bool flashy)>();

            foreach (var m in modelsEl.EnumerateArray())
            {
                if (!m.TryGetProperty("name", out var nameEl)) continue;
                var fullName = nameEl.GetString() ?? "";
                if (string.IsNullOrWhiteSpace(fullName)) continue;

                // fullName is like "models/gemini-..."
                var shortName = fullName.StartsWith("models/") ? fullName["models/".Length..] : fullName;

                // Must support generateContent (or you’ll get “not supported”)
                if (m.TryGetProperty("supportedGenerationMethods", out var methodsEl) && methodsEl.ValueKind == JsonValueKind.Array)
                {
                    var supportsGenerate = methodsEl.EnumerateArray()
                        .Select(x => x.GetString() ?? "")
                        .Any(x => x.Equals("generateContent", StringComparison.OrdinalIgnoreCase));

                    if (!supportsGenerate) continue;
                }

                var flashy = shortName.Contains("flash", StringComparison.OrdinalIgnoreCase);
                candidates.Add((shortName, flashy));
            }

            if (candidates.Count == 0)
                throw new InvalidOperationException("No Gemini models found that support generateContent for your API key.");

            // Prefer “flash” models first (faster/cheaper usually), otherwise first available
            var chosen = preferFlash
                ? candidates.OrderByDescending(x => x.flashy).First().modelName
                : candidates.First().modelName;

            Console.WriteLine($"✅ Gemini model selected: {chosen}");
            return chosen;
        }

        private static string? ExtractText(string rawJson)
        {
            using var doc = JsonDocument.Parse(rawJson);

            // candidates[0].content.parts[0].text
            if (doc.RootElement.TryGetProperty("candidates", out var candidates) &&
                candidates.ValueKind == JsonValueKind.Array &&
                candidates.GetArrayLength() > 0)
            {
                var c0 = candidates[0];

                if (c0.TryGetProperty("content", out var content) &&
                    content.TryGetProperty("parts", out var parts) &&
                    parts.ValueKind == JsonValueKind.Array &&
                    parts.GetArrayLength() > 0)
                {
                    var p0 = parts[0];
                    if (p0.TryGetProperty("text", out var textEl))
                        return textEl.GetString();
                }
            }

            return null;
        }

        private static string Normalize(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                throw new ArgumentException("Subject cannot be empty.");

            var clean = input.Trim();
            if (clean.Length < 2)
                throw new ArgumentException("Subject is too short.");

            return clean;
        }
    }
}