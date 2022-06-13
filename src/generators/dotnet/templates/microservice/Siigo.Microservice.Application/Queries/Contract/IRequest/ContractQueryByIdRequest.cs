using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest
{
    public class ContractQueryByIdRequest : IRequest<ContractQueryByIdResponse>
    {
        public string? ContractId { get; set; }
    }
}