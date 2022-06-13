using System;
using System.Threading.Tasks;
using Contract.V1;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Mapster;
using MediatR;
using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1
{
    public class ContractGrpcController : ContractService.ContractServiceBase
    {
        private readonly SiigoLogger _logger = new();
        private readonly IMediator _mediator;

        public ContractGrpcController(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override async Task<FindContractsResponse> FindContracts(Empty request, ServerCallContext context)
        {
            _logger.LogInformation("FindContracts invoked", request, LogCategory.Audit);
            var response = await _mediator.Send(new ContractsQueryRequest());
            return response.Adapt<FindContractsResponse>();
        }

        public override async Task<FindContractByIdResponse> FindContractById(FindContractByIdRequest request,
            ServerCallContext context)
        {
            _logger.LogInformation("FindContractById invoked. ", request, LogCategory.Audit);
            var response = await _mediator.Send(new ContractQueryByIdRequest { ContractId = request.ContractId });
            return response.Adapt<FindContractByIdResponse>();
        }

        public override async Task<CreateContractResponse> CreateContract(CreateContractRequest request,
            ServerCallContext context)
        {
            _logger.LogDebug($"CreateContract invoked. {request}");

            var contract = request.Contract.Adapt(Domain.Aggregates.Contract.Contract.Instance());
            var response = await _mediator.Send(new CreateContractCommandRequest(contract));
            return response.Adapt<CreateContractResponse>();
        }

        public override async Task<UpdateContractResponse> UpdateContract(UpdateContractRequest request,
            ServerCallContext context)
        {
            _logger.LogDebug($"CreateContract invoked. {request}");

            var contract = request.Contract.Adapt(new Domain.Aggregates.Contract.Contract());
            var response = await _mediator.Send(new UpdateContractCommandRequest(contract));
            return response.Adapt<UpdateContractResponse>();
        }

        public override async Task<Empty> DeleteContract(DeleteContractRequest request,
            ServerCallContext context)
        {
            _logger.LogDebug($"DeleteContract invoked. {request}");

            await _mediator.Send(new DeleteContractCommandRequest(new Guid(request.ContractId)));
            return new Empty();
        }
    }
}