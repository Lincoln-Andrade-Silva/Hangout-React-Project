using Domain;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PostController : BaseApi
    {
        private readonly DataContext context;
        public PostController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> getPosts()
        {
            return await this.context.Posts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> getPost(Guid id)
        {
            return await this.context.Posts.FindAsync(id);
        }
    }
}