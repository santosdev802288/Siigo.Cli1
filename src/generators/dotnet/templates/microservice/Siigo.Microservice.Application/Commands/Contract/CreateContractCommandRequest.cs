using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract
{
    public class CreateContractCommandRequest : IRequest<CreateContractCommandResponse>
    {
        public Domain.Aggregates.Contract.Contract Contract { get; }

        public CreateContractCommandRequest(Domain.Aggregates.Contract.Contract contract)
        {
            Contract = contract;
        }
    }
}