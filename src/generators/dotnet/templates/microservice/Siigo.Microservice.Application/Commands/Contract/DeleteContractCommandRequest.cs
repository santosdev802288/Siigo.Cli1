using System;
using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract
{
    public class DeleteContractCommandRequest : IRequest<DeleteContractCommandResponse>
    {
        public Guid ContractId { get; }

        public DeleteContractCommandRequest(Guid contractId)
        {
            ContractId = contractId;
        }
    }
}