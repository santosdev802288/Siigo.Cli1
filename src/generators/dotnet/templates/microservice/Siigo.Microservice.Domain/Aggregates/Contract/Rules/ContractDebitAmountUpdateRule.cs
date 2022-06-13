using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Rules
{
    /// <summary>
    ///     Domain rule to check amount edition
    ///     WHEN: status is open
    ///     THEN: Amount can be edit
    ///     ELSE: lock editing
    /// </summary>
    public class ContractDebitAmountUpdateRule : IDomainRules
    {
        /// <summary>
        ///     Status for check the rule
        /// </summary>
        private readonly ContractDebitStatusItem _status;

        private ContractDebitAmountUpdateRule(ContractDebitStatusItem status)
        {
            _status = status;
        }

        /// <summary>
        ///     Message to exception
        /// </summary>
        public string Message => "The amount can't be update, because status is different of Open";


        /// <summary>
        ///     If the rules fail return true and throw the domain exception
        /// </summary>
        /// <returns>true</returns>
        public bool IsBroken()
        {
            return _status != ContractDebitStatusItem.Open;
        }

        /// <summary>
        ///     Create instance singleton
        /// </summary>
        /// <param name="status"></param>
        /// <returns>A instance for <see cref="ContractDebitAmountUpdateRule" /> </returns>
        public static ContractDebitAmountUpdateRule Instance(ContractDebitStatusItem status)
        {
            return new ContractDebitAmountUpdateRule(status);
        }
    }
}

