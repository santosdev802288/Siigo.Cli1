using FluentValidation;
using MediatR;

namespace <%= config.name %>.Application.Commands
{
    /// <summary>
    /// A command has all the data needed to service a request
    /// </summary>
    public class <%= config.command_name %>Command
        : IRequest<int>
    {
        public int <%= config.command_name %>Id { get; set; }

        protected <%= config.command_name %>Command()
        {
        }

        public <%= config.command_name %>Command(int id)
        {
            <%= config.command_name %>Id = id;
        }


        public class <%= config.command_name %>CommandValidator : AbstractValidator<<%= config.command_name %>Command>
        {
            public <%= config.command_name %>CommandValidator()
            {
                RuleFor(m => m.<%= config.command_name %>Id).GreaterThan(0)
                    .WithMessage("<%= config.command_name %>Id  must be greater than 0}");
            }
        }
    }
}
