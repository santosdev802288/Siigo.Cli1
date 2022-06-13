namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest
{
    public class ContractsQueryResponse
    {
        public ContractsQueryResponse(IEnumerable<Domain.Aggregates.Contract.Contract> contracts)
        {
            Contracts = contracts;
        }

        public IEnumerable<Domain.Aggregates.Contract.Contract> Contracts { get; set; }
    }                                                                                           
}