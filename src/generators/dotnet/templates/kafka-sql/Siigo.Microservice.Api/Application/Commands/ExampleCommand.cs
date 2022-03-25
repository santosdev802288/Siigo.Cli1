using System;
using FluentValidation;
using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Commands
{
    /// <summary>
    /// A command has all the data needed to service a request
    /// </summary>
    public class ExampleCommand : IRequest<string>
    {
        public Guid Id { get; set; }
        public string Message { get; set; }

        public ExampleCommand(Guid id, string message = "")
        {
            Id = id;
            Message = message;
        }


        public class ExampleCommandValidator : AbstractValidator<ExampleCommand>
        {
            public ExampleCommandValidator()
            {
                _ = RuleFor(m => m.Message).NotEmpty()
                    .WithMessage("Message must not be empty");
            }
        }
    }
}
