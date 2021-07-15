using FluentValidation;
using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Commands
{
    /// <summary>
    /// A command has all the data needed to service a request
    /// </summary>
    public class ExampleCommand : IRequest<string>
    {
        public int ExampleId { get; set; }

        protected ExampleCommand()
        {
        }

        public ExampleCommand(int id)
        {
            ExampleId = id;
        }


        public class ExampleCommandValidator : AbstractValidator<ExampleCommand>
        {
            public ExampleCommandValidator()
            {
                RuleFor(m => m.ExampleId).GreaterThan(0)
                    .WithMessage("ExampleId  must be greater than 0}");
            }
        }
    }
}
