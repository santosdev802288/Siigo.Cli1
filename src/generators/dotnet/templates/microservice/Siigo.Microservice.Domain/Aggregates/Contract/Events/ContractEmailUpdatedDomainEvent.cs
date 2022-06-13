using MediatR;
using Siigo.Core;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events
{
    public class ContractEmailUpdatedDomainEvent : IDomainEvent, INotification
    {
        public ContractEmailUpdatedDomainEvent(string id, string email)
        {
            Email = email;
            EventType = GetType().Name;
            Id = id;
        }

        public string EventType { get; }

        public string Email { get; }
        public string Id { get; init; }
    }
}