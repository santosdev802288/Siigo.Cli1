using MediatR;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands
{
    public class ContractsCommandHandler :
        IRequestHandler<CreateContractCommandRequest, CreateContractCommandResponse>,
        IRequestHandler<UpdateContractCommandRequest, UpdateContractCommandResponse>,
        IRequestHandler<DeleteContractCommandRequest, DeleteContractCommandResponse>

    {
        public readonly IContractService<Domain.Aggregates.Contract.Contract> ContractService;

        public ContractsCommandHandler(IContractService<Domain.Aggregates.Contract.Contract> contractService)
        {
            ContractService = contractService;
        }

        public async Task<CreateContractCommandResponse> Handle(CreateContractCommandRequest request,
            CancellationToken cancellationToken)
        {
            await ContractService.InsertAsync(request.Contract);
            return new CreateContractCommandResponse(request.Contract.Id);
        }

        public async Task<DeleteContractCommandResponse> Handle(DeleteContractCommandRequest request,
            CancellationToken cancellationToken)
        {
            await ContractService.DeleteAsync(request.ContractId);
            return new DeleteContractCommandResponse();
        }


        public async Task<UpdateContractCommandResponse> Handle(UpdateContractCommandRequest request,
            CancellationToken cancellationToken)
        {
            await ContractService.UpdateAsync(request.Contract);
            return new UpdateContractCommandResponse(request.Contract);
        }
    }    
}

