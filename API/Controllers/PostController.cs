using Domain;
using MediatR;
using Application.Service;
using Microsoft.AspNetCore.Mvc;
using Application.Service.Posts;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    public class PostController : BaseApi
    {
        private new readonly IMediator Mediator;
        public PostController(IMediator Mediator)
        {
            this.Mediator = Mediator;
        }

        [HttpGet]
        public async Task<ActionResult> list()
        {
            return HandleResult(await this.Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> get(Guid Id)
        {
            return HandleResult(await this.Mediator.Send(new Details.Query { Id = Id }));

        }

        [HttpPost]
        public async Task<ActionResult<Post>> create(Post Post)
        {
            return HandleResult(await this.Mediator.Send(new Create.Command { Post = Post }));
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult<Post>> edit(Guid Id, Post Post)
        {
            Post.Id = Id;
            return HandleResult(await this.Mediator.Send(new Edit.Command { Post = Post }));
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<Post>> delete(Guid Id)
        {
            return HandleResult(await this.Mediator.Send(new Delete.Command { Id = Id }));
        }
    }
}