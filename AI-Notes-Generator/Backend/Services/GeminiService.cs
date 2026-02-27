using GenerativeAI;

namespace Backend.Services
{
    public class GeminiService
    {
        private readonly GenerativeModel _model;

        public GeminiService(IConfiguration config)
        {
            var apiKey = config["GeminiSettings:ApiKey"];
            _model = new GenerativeModel(apiKey, "gemini-1.5-flash");
        }

        public async Task<string> GenerateNotesAsync(string subject)
        {
            var prompt = $"Write detailed, structured study notes about {subject}. Include headings and bullet points.";
            var response = await _model.GenerateContentAsync(prompt);
            return response.Text();
        }

        public async Task<string> GenerateQuizAsync(string subject)
        {
            var prompt = $"Generate 5 quiz questions about {subject} in JSON format with questions and answers.";
            var response = await _model.GenerateContentAsync(prompt);
            return response.Text();
        }
    }
}