using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract
{
    public class UpdateContractCommandRequest : IRequest<UpdateContractCommandResponse>
    {
        public Domain.Aggregates.Contract.Contract Contract { get; }

        public UpdateContractCommandRequest(Domain.Aggregates.Contract.Contract contract)
        {
            Contract = contract;
        }
    }
}