namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract
{
    public class UpdateContractCommandResponse
    {
        public UpdateContractCommandResponse(Domain.Aggregates.Contract.Contract contract)
        {
            Contract = contract;
        }

        public Domain.Aggregates.Contract.Contract Contract { get; }
        
    }
}