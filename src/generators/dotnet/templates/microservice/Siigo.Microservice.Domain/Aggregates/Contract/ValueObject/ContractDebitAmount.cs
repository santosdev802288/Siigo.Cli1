using Dawn;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject
{
    public class ContractDebitAmount
    {
        private ContractDebitAmount(float value)
        {
            Value = Guard.Argument(value, nameof(value)).NotNegativeInfinity();
        }

        public float Value { get; protected set; }

        public static ContractDebitAmount Instance(float value)
        {
            return new ContractDebitAmount(value);
        }
    }    
}

