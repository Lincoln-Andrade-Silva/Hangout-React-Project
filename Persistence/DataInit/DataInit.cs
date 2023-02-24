using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence.DataInit
{
    public class DataInit
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Lincoln",
                        UserName = "lico",
                        Bio = "Bio",
                        Email = "lico@admin.com"
                    },
                     new AppUser
                    {
                        DisplayName = "Guilherme",
                        UserName = "gunther",
                        Bio = "Bio",
                        Email = "gunther@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                };
            }

            if (!context.Posts.Any())
            {

                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Assistir M3GAN",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Description",
                        Category = "Film",
                        City = "Curitiba",
                        Venue = "Shopping Palladium",
                    }
                };
                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }
        }
    }
}