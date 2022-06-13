using MediatR;
using Siigo.Core;
using Siigo.Core.Trace.Attributes;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events
{
    public class ContractCreatedDomainEvent : IDomainEvent, INotification
    {
        public ContractCreatedDomainEvent(string id)
        {
            Id = id;
            EventType = GetType().Name;
        }

        public string EventType { get; }

        [TraceUniqueKey] public string Id { get; init; }
    }
}