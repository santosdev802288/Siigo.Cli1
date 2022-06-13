using System.Text.Json;
using System.Threading.Tasks;
using EventStore.Client;
using Siigo.Core;
using Siigo.FixedML.Domain.SeedWork.Interfaces;

namespace Siigo.FixedML.Infrastructure.Repositories
{
    public class EventStoreRepository : IEventStoreRepository
    {
        private readonly EventStoreClient _client;

        public EventStoreRepository(EventStoreClientSettings eventStore)
        {
            _client = new EventStoreClient(eventStore);
        }

        public async Task SaveAsync(string streamName, IDomainEvent domainEvent)
        {
            var eventData = new EventData(
                Uuid.NewUuid(),
                domainEvent.GetType().Name,
                JsonSerializer.SerializeToUtf8Bytes<object>(domainEvent)
            );

            await _client.AppendToStreamAsync(
                streamName,
                StreamState.Any,
                new[] { eventData },
                options => options.ThrowOnAppendFailure = true
            );
        }
    }
}
