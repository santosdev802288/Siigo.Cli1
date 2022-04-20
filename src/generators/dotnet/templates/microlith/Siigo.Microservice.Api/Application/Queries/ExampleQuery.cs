using System;
using FluentValidation;
using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Queries
{
    /// <summary>
    /// We handle the query objects like the command and command handlers
    /// The Query DTO includes all the data needed to handle the request
    /// </summary>
    public class ExampleQuery : IRequest<string> // replace object with your class
    {
        public Guid Id { get; }


        public ExampleQuery(Guid id)
        {
            Id = id;
        }

        public class ExampleQueryValidator : AbstractValidator<ExampleQuery>
        {
            public ExampleQueryValidator()
            {
                _ = RuleFor(m => m.Id).NotEmpty().WithMessage("The attribute cannot empty");
            }
        }
    }
}
