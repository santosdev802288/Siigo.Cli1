using System;
using System.Threading.Tasks;
using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Events
{
    public class DomainEventBus : IDomainEventBus
    {
        private readonly IDomainEventQueue _domainEventQueue;


        public DomainEventBus(IDomainEventQueue taskQueue)
        {
            _domainEventQueue = taskQueue;
        }

        public Task Publish<T>(T entity) where T : Entity<Guid>, new()
        {
            return _domainEventQueue.QueueDomainEventAsync(entity);
        }
    }
}