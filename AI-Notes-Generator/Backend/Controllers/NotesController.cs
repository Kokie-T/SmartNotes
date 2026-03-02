using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly GeminiService _gemini;

        public NotesController(ApplicationDbContext context, GeminiService gemini)
        {
            _context = context;
            _gemini = gemini;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromQuery] string subject)
        {
            try
            {
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrWhiteSpace(userIdStr))
                    return Unauthorized("Missing user id claim.");

                if (!Guid.TryParse(userIdStr, out var userId))
                    return Unauthorized("Invalid user id claim (expected GUID).");

                var content = await _gemini.GenerateNotesAsync(subject);

                var note = new Note
                {
                    UserId = userId,
                    Subject = subject.Trim(),
                    Content = content
                };

                _context.Notes.Add(note);
                await _context.SaveChangesAsync();

                // Return only what frontend needs
                return Ok(new
                {
                    id = note.Id,
                    subject = note.Subject,
                    content = note.Content,
                    createdAt = note.CreatedAt
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 NotesController.Generate failed:");
                Console.WriteLine(ex.ToString());

                // This will show your real Gemini error on the frontend, not just “500”
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetMyNotes()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdStr))
                return Unauthorized("Missing user id claim.");

            if (!Guid.TryParse(userIdStr, out var userId))
                return Unauthorized("Invalid user id claim (expected GUID).");

            var notes = _context.Notes
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToList();

            return Ok(notes);
        }
    }
}