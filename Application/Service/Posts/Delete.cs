using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Service
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await this.context.Posts.FindAsync(request.Id);
                if (post == null) return null;

                this.context.Remove(post);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the Post");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}