using System.Threading.Tasks;
using Siigo.Core;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces
{
    public interface IEventStoreRepository
    {
        /// <summary>
        ///     Save the event on Event  Store Db
        /// </summary>
        /// <param name="streamName">Name of aggregate that emit the event </param>
        /// <param name="domainEvent">Data event to save on event store</param>
        /// <returns></returns>
        public Task SaveAsync(string streamName, IDomainEvent domainEvent);
    }    
}

