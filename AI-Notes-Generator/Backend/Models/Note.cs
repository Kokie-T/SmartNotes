namespace Backend.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int UserId { get; set; }          // links to User
        public string Subject { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
