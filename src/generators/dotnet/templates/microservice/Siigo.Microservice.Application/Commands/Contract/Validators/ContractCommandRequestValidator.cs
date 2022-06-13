using FluentValidation;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract.Validators
{
    public class ContractCommandRequestValidator : AbstractValidator<CreateContractCommandRequest>
    {
        public ContractCommandRequestValidator()
        {
            RuleFor(request => request.Contract.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("The email must not be empty and must be formatted correctly");

            RuleFor(request => request.Contract.Address)
                .NotEmpty()
                .WithMessage("Address must not be empty");
        }
    }
}

