using MediatR;
using Siigo.Core;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events
{
    public class ContractStatusUpdatedDomainEvent : IDomainEvent, INotification
    {
        private ContractStatusUpdatedDomainEvent(string id, string status, string prevStatus)
        {
            Id = id;
            Status = status;
            PrevStatus = prevStatus;
        }

        public string Status { get; }
        public string PrevStatus { get; }

        public string Id { get; init; }

        public static ContractStatusUpdatedDomainEvent Instance(string id, string status, string prevStatus)
        {
            return new ContractStatusUpdatedDomainEvent(id, status, prevStatus);
        }
    }    
}

