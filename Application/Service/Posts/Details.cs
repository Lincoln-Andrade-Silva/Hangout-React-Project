using Application.Core;
using Application.Core.Model.Posts;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Service.Posts
{
    public class Details
    {
        public class Query : IRequest<Result<PostDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PostDTO>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PostDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await this.context.Posts
                    .ProjectTo<PostDTO>(this.mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<PostDTO>.Success(post);
            }
        }
    }
}