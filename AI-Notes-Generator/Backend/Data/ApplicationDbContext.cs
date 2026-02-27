using Microsoft.EntityFrameworkCore;

using Backend.Models;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Note> Notes => Set<Note>();
        public DbSet<Quiz> Quizzes => Set<Quiz>();
    }
}

