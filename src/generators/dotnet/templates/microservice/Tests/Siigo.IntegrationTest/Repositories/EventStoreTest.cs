using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;
using Siigo.IntegrationTest.FluentBase;
using Xunit;

namespace Siigo.IntegrationTest.Repositories;

public class EventStoreTest : IClassFixture<EventStoreTestBaseDocker>
{
    private IEventStoreRepository _eventStoreRepository;
    private RoutingServiceCore _serviceCore;


    public EventStoreTest()
    {
        GlobalSetup();
    }

    private void GlobalSetup()
    {
        _serviceCore = new RoutingServiceCore();
        _eventStoreRepository = _serviceCore.EventStoreRepository;
        Console.WriteLine("GlobalSetup");
    }


    [Fact]
    private void Insert_EventStore_ReturnsSuccess()
    {
        // Arrange
        var model = <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract.Instance();

        //  Assert
        foreach (var domainEvent in model.DomainEvents)
            Assert.NotNull(_eventStoreRepository.SaveAsync(nameof(domainEvent), domainEvent));
    }

    [Fact]
    private void Insert_EventStore_Nulls()
    {
        // Arrange
        var model = new <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract(Guid.NewGuid());

        //  Assert
        Assert.Null(model.DomainEvents);
    }
}