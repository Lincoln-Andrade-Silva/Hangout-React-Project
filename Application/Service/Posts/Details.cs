using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Service.Posts
{
    public class Details
    {
        public class Query : IRequest<Result<Post>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Post>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<Post>.Success(await this.context.Posts.FindAsync(request.Id));
            }
        }
    }
}