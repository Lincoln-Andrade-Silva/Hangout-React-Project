using Domain;
using MediatR;
using Persistence;

namespace Application.Service
{
    public class Delete
    {
        public class Command : IRequest<Post>
        {
            public Guid Id { get; set; }
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
                var Post = await this.context.Posts.FindAsync(request.Id);

                this.context.Remove(Post);
                await this.context.SaveChangesAsync();

                return Post;
            }
        }

    }
}