namespace Backend.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public int UserId { get; set; }          // links to User
        public string Subject { get; set; } = null!;
        public string QuestionsJson { get; set; } = null!; // JSON string of questions
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
