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
        public async Task<IActionResult> GenerateNote([FromQuery] string subject)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var content = await _gemini.GenerateNotesAsync(subject);

            var note = new Note
            {
                UserId = userId,
                Subject = subject,
                Content = content
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return Ok(note);
        }

        [HttpGet]
        public IActionResult GetNotes()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var notes = _context.Notes.Where(n => n.UserId == userId).ToList();
            return Ok(notes);
        }
    }
}
