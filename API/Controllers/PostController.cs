using Domain;
using MediatR;
using Application.Service;
using Microsoft.AspNetCore.Mvc;
using Application.Service.Posts;

namespace API.Controllers
{
    public class PostController : BaseApi
    {
        private readonly IMediator iMediator;
        public PostController(IMediator iMediator)
        {
            this.iMediator = iMediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> list()
        {
            return await this.iMediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> get(Guid Id)
        {
            return await this.iMediator.Send(new Details.Query { Id = Id });
        }

        [HttpPost]
        public async Task<ActionResult<Post>> create(Post Post)
        {
            return await this.iMediator.Send(new Create.Command { Post = Post });
        }

        [HttpPatch("{Id}")]
        public async Task<ActionResult<Post>> edit(Guid Id, Post Post)
        {
            Post.Id = Id;
            return await this.iMediator.Send(new Edit.Command { Post = Post });
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<Post>> delete(Guid Id)
        {
            return await this.iMediator.Send(new Delete.Command { Id = Id });
        }
    }
}