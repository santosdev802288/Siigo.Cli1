using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;
using SlimMessageBus;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Events
{
public class DomainEventBackgroundService : BackgroundService
{
    private readonly IHostApplicationLifetime _applicationLifetime;
    private readonly IDomainEventQueue _domainEventQueue;
    private readonly IEventStoreRepository _eventStoreRepository;
    private readonly IMessageBus _messageBus;

    public DomainEventBackgroundService(IServiceScopeFactory serviceScopeFactory,
        IDomainEventQueue domainEventQueue,
        IHostApplicationLifetime applicationLifetime
    )
    {
        _domainEventQueue = domainEventQueue;
        _applicationLifetime = applicationLifetime;

        using var scope = serviceScopeFactory.CreateScope();
        _eventStoreRepository = scope.ServiceProvider.GetRequiredService<IEventStoreRepository>();
        _messageBus = scope.ServiceProvider.GetRequiredService<IMessageBus>();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        SiigoLog<DomainEventBus>
            .LogInformation("Domain event background service is running on background!");

        var isAppRunning = !_applicationLifetime.ApplicationStarted.IsCancellationRequested;

        // ReSharper disable once LoopVariableIsNeverChangedInsideLoop
        while (isAppRunning)
            try
            {
                var aggregate = await _domainEventQueue.DequeueDomainEventAsync();

                var evt = aggregate.DomainEvents?.ToArray();
                var streamName = $"{aggregate.GetType().Name}-{aggregate.Id}";

                if (evt is null)
                {
                    SiigoLog<DomainEventBus>
                        .LogWarning("The aggregate isn't sending domain event");
                    return;
                }

                foreach (var domainEvent in evt)
                    Task.WaitAll(new[]
                    {
                        _eventStoreRepository.SaveAsync(streamName, domainEvent), // EventStore
                        _messageBus.Publish(domainEvent) // Kafka
                    }, stoppingToken);

                aggregate.ClearDomainEvents();
            }
            catch (Exception ex)
            {
                SiigoLog<DomainEventBackgroundService>.LogWarning(ex, "Error occurred executing Work item.");
            }
    }
}    
}

