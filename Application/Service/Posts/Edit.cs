using Application.Core;
using Application.Core.Posts;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Service.Posts
{
    public class Edit
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
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await this.context.Posts.FindAsync(request.Post.Id);

                if (post == null) return null;

                this.mapper.Map(request.Post, post);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to edit the Post");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}