using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Rules
{
    public class ContractDebitStatusCanBeUpdateRule : IDomainRules
    {
        private readonly float _amount;
        private readonly ContractDebitStatusItem _status;

        private ContractDebitStatusCanBeUpdateRule(ContractDebitStatusItem status, float amount)
        {
            _status = status;
            _amount = amount;
        }

        public string Message => $"The status can't be different Open, because have amount: {_amount}";

        public bool IsBroken()
        {
            // WHEN: Amount > 0
            // THEN: the status can't be Closed or Finished
            return _amount > 0 && _status != ContractDebitStatusItem.Open;
        }

        public static ContractDebitStatusCanBeUpdateRule Instance(ContractDebitStatusItem status, float amount)
        {
            return new ContractDebitStatusCanBeUpdateRule(status, amount);
        }
    }    
}

