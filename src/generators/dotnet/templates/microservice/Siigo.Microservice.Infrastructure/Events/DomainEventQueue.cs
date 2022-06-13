using System;
using System.Threading.Channels;
using System.Threading.Tasks;
using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Events
{
    public class DomainEventQueue : IDomainEventQueue
    {
        private readonly Channel<Entity<Guid>> _queue;

        public DomainEventQueue()
        {
            _queue = Channel.CreateUnbounded<Entity<Guid>>();
        }


        public async Task QueueDomainEventAsync(Entity<Guid> aggregate)
        {
            await _queue.Writer.WriteAsync(aggregate);
        }


        public async Task<Entity<Guid>> DequeueDomainEventAsync()
        {
            return await _queue.Reader.ReadAsync();
        }
    }
}