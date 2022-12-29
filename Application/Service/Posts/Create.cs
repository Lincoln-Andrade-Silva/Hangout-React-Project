using Domain;
using MediatR;
using Persistence;

namespace Application.Service.Posts
{
    public class Create
    {
        public class Command : IRequest<Post>
        {
            public Post Post { get; set; }
        }


        public class Handler : IRequestHandler<Command, Post>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Post> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Posts.Add(request.Post);

                await this.context.SaveChangesAsync();

                return await this.context.Posts.FindAsync(request.Post.Id);
            }
        }
    }
}