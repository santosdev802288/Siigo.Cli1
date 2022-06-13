using MediatR;
using Siigo.Core;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events
{
    /// <summary>
    ///     Domain event for contract amount updated
    /// </summary>
    public class ContractAmountUpdatedDomainEvent : IDomainEvent, INotification
    {
        private ContractAmountUpdatedDomainEvent(string id, float amount)
        {
            Id = id;
            Amount = amount;
        }

        public float Amount { get; }

        public string Id { get; init; }

        public static ContractAmountUpdatedDomainEvent Instance(string id, float amount)
        {
            return new ContractAmountUpdatedDomainEvent(id, amount);
        }
    }    
}

