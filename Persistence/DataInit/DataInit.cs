using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence.DataInit
{
    public class DataInit
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Posts.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Lincoln",
                        UserName = "lico",
                        Email = "lico@admin.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Guilherme",
                        UserName = "gunther",
                        Email = "gui@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Picnic at Barigui Park",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Description",
                        Category = "Nature",
                        City = "Curitiba",
                        Venue = "Barigui Park ",
                        Attendees = new List<PostAttendee>
                        {
                            new PostAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new PostAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }
        }
    }
}