namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract
{
    public class CreateContractCommandResponse
    {
        public CreateContractCommandResponse(Guid contractId)
        {
            ContractId = contractId;
        }

        public Guid ContractId { get; }
    }
}