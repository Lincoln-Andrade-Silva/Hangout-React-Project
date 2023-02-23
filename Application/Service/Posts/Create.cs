using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core.Posts;
using Application.Core;

namespace Application.Service.Posts
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Post Post { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Post).SetValidator(new PostValidator());
            }
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
                this.context.Posts.Add(request.Post);

                var result = await this.context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Post");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}