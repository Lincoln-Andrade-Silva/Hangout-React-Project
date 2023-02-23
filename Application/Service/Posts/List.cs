using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Service.Posts
{
    public class List
    {
        public class Query : IRequest<Result<List<Post>>> { }


        public class Handler : IRequestHandler<Query, Result<List<Post>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Post>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Post>>.Success(await this.context.Posts.ToListAsync(cancellationToken));
            }
        }
    }
}