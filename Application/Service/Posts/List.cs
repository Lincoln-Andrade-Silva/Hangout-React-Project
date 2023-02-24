using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using Application.Core.Model.Posts;
using AutoMapper.QueryableExtensions;

namespace Application.Service.Posts
{
    public class List
    {
        public class Query : IRequest<Result<List<PostDTO>>> { }


        public class Handler : IRequestHandler<Query, Result<List<PostDTO>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<List<PostDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await this.context.Posts
                    .ProjectTo<PostDTO>(this.mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<PostDTO>>.Success(posts);
            }
        }
    }
}