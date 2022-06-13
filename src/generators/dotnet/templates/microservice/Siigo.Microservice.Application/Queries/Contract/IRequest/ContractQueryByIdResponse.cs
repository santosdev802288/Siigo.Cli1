using MediatR;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest
{
    public class ContractQueryByIdResponse
    {
        public Domain.Aggregates.Contract.Contract? Contract { get; set; }
    }
}