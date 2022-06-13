using FluentValidation;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.Validators
{
    public class ContractQueryByIdRequestValidator : AbstractValidator<ContractQueryByIdRequest>
    {
        public ContractQueryByIdRequestValidator()
        {
            RuleFor(request => request.ContractId)
                .NotEmpty()
                .Must(ValidateBar)
                .NotNull();
        }

        public bool ValidateBar(string? id)
        {
            return Guid.TryParse(id, out _);
        }
    }
}