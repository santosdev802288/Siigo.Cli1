using MediatR;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract
{
// Siigo.<%= config.nameCapitalize %>.Apis Architecture comment
// Creating queries independent of the domain model, the aggregates boundaries and 
// constraints are completely ignored gives freedom to query any table and column you might need. 
// This approach provides great flexibility and productivity for the developers creating or updating the queries.
    public class ContractsQueryHandler :
        IRequestHandler<ContractsQueryRequest, ContractsQueryResponse>,
        IRequestHandler<ContractQueryByIdRequest, ContractQueryByIdResponse>
    {
        private readonly IContractService<Domain.Aggregates.Contract.Contract> _contractService;

        public ContractsQueryHandler(IContractService<Domain.Aggregates.Contract.Contract> contractService)
        {
            _contractService = contractService;
        }

        public async Task<ContractQueryByIdResponse> Handle(ContractQueryByIdRequest request,
            CancellationToken cancellationToken)
        {
            var contract = await _contractService.SelectByIdAsync(request.ContractId);
            return new ContractQueryByIdResponse { Contract = contract };
        }

        public async Task<ContractsQueryResponse> Handle(ContractsQueryRequest request,
            CancellationToken cancellationToken)
        {
            var contracts = await _contractService.SelectAsync();
            return new ContractsQueryResponse(contracts);
        }
    }    
}

