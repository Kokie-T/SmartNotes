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
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly GeminiService _gemini;

        public QuizController(ApplicationDbContext context, GeminiService gemini)
        {
            _context = context;
            _gemini = gemini;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateQuiz([FromQuery] string subject)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdStr == null) return Unauthorized();

            if (!Guid.TryParse(userIdStr, out var userId))
                return BadRequest("Invalid user ID format.");

            var questionsJson = await _gemini.GenerateQuizAsync(subject);

            var quiz = new Quiz
            {
                UserId = userId, // ✅ Guid
                Subject = subject,
                QuestionsJson = questionsJson
            };

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            return Ok(quiz);
        }

        [HttpGet]
        public IActionResult GetQuizzes()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdStr == null) return Unauthorized();

            if (!Guid.TryParse(userIdStr, out var userId))
                return BadRequest("Invalid user ID format.");

            var quizzes = _context.Quizzes.Where(q => q.UserId == userId).ToList();
            return Ok(quizzes);
        }
    }
}