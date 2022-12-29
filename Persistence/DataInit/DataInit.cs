using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence.DataInit
{
    public class DataInit
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Title = "Post",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Post 2 months ago",
                    Category = "Drinks",
                    City = "London",
                    Venue = "Pub",
                }
            };
            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}