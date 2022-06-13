using System;
using System.Threading.Tasks;
using Siigo.Core.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces
{
    public interface IDomainEventQueue
    {
        /// <summary>
        ///     Add aggregate to queue for map domain events
        /// </summary>
        /// <param name="aggregate"></param>
        /// <returns></returns>
        Task QueueDomainEventAsync(Entity<Guid> aggregate);


        /// <summary>
        ///     Getting aggregate from queue for map domain events and publish
        /// </summary>
        /// <returns></returns>
        Task<Entity<Guid>> DequeueDomainEventAsync();
    }    
}

