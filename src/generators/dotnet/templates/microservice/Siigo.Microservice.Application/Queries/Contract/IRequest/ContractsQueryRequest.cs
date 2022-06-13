using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest
{
    public class ContractsQueryRequest : IRequest<ContractsQueryResponse>
    {
    }
}