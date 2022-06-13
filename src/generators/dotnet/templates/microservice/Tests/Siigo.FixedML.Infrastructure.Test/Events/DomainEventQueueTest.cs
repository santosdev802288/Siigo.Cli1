using System.Threading.Tasks;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Events;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Events;

public class DomainEventQueueTest
{
    [Fact]
    public Task QueueDomainEvent_WhenCreateEntity_SendSuccess()
    {
        //Arrange 
        DomainEventQueue domainEvent = new DomainEventQueue();

        // Act
        var contractResult = domainEvent.QueueDomainEventAsync(Domain.Aggregates.Contract.Contract.Instance());
        
        // Assert
        Assert.NotNull(contractResult);
        return Task.CompletedTask;
    }
    
    [Fact]
    public Task DequeueDomainEvent_WhenCreateEntity_SendSuccess()
    {
        //Arrange 
        DomainEventQueue domainEvent = new DomainEventQueue();

        // Act
        var contractResult = domainEvent.QueueDomainEventAsync(Domain.Aggregates.Contract.Contract.Instance());
        var dequeueResult = domainEvent.DequeueDomainEventAsync();

        // Assert
        Assert.NotNull(contractResult);
        Assert.NotNull(dequeueResult);
        return Task.CompletedTask;
    }
}