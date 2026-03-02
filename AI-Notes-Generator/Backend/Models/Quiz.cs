using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Quiz
    {
        public int Id { get; set; }

        public Guid UserId { get; set; } // ✅ must match User.Id type (Guid)

        [Required]
        [MaxLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "nvarchar(max)")] // ✅ quizzes can be long JSON
        public string QuestionsJson { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}