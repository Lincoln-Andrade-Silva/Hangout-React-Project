using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Service.Profiles
{
    public class ListPosts
    {
        public class Query : IRequest<Result<List<UserPostDTO>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserPostDTO>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<UserPostDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PostAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Post.Date)
                    .ProjectTo<UserPostDTO>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var activities= await query.ToListAsync();

                return Result<List<UserPostDTO>>.Success(activities);
            }
        }
    }
}