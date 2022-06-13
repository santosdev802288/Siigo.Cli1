using EventStore.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.FixedML.Domain.SeedWork.Interfaces;
using Siigo.FixedML.Infrastructure.Events;
using Siigo.FixedML.Infrastructure.Repositories;

namespace Siigo.FixedML.Infrastructure
{
    public static class ServiceCollectionExtension
    {
        /// <summary>
        ///     Adds services required for application Domain.
        /// </summary>
        /// <param name="services">The Microsoft.Extensions.DependencyInjection.IServiceCollection to add the services to.</param>
        /// <param name="configuration">Represents a set of key/value application configuration properties</param>
        /// <returns>The Microsoft.Extensions.DependencyInjection.IServiceCollection so that additional calls can be chained.</returns>
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
            //Event Store Config
            var eventStoreConnection = EventStoreClientSettings.Create(
                configuration.GetValue<string>("EventStore:ConnectionString")
            );
            services.AddSingleton(eventStoreConnection);
            services.AddSingleton<IEventStoreRepository, EventStoreRepository>();
            //Event Store Config - End


            services.AddHostedService<DomainEventBackgroundService>();
            services.AddSingleton<IDomainEventQueue>(ctx => new DomainEventQueue());
            return services;
        }
    }
}