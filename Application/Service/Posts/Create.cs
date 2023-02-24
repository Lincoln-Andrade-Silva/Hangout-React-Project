using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core.Posts;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

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
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.FirstOrDefaultAsync(x =>
                  x.UserName == this.userAccessor.GetUsername());

                var attendee = new PostAttendee
                {
                    AppUser = user,
                    Post = request.Post,
                    IsHost = true
                };

                request.Post.Attendees.Add(attendee);

                this.context.Posts.Add(request.Post);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}