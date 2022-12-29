using Domain;
using MediatR;
using AutoMapper;
using Persistence;

namespace Application.Service.Posts
{
    public class Edit
    {
        public class Command : IRequest<Post>
        {
            public Post Post { get; set; }
        }


        public class Handler : IRequestHandler<Command, Post>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Post> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = this.mapper.Map(request.Post, await this.context.Posts.FindAsync(request.Post.Id));

                await this.context.SaveChangesAsync();

                return post;
            }
        }
    }
}