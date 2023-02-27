using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostAttendee> PostAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PostAttendee>(x => x.HasKey(y => new { y.AppUserId, y.PostId }));

            builder.Entity<PostAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Posts)
                .HasForeignKey(b => b.AppUserId);

            builder.Entity<PostAttendee>()
                .HasOne(u => u.Post)
                .WithMany(a => a.Attendees)
                .HasForeignKey(b => b.PostId);
        }
    }
}