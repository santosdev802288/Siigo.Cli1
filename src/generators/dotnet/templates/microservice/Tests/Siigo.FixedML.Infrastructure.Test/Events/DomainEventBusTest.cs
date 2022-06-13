using System.Threading.Tasks;
using Moq;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Events;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Events;

public class DomainEventBusTest
{
    private readonly Mock<IDomainEventQueue> _domainEventBusMock;

    public DomainEventBusTest()
    {
        _domainEventBusMock = new Mock<IDomainEventQueue>();
    }

    [Fact]
    public async Task Publish_WhenCreateEventBus_SendSuccess()
    {
        // Arrange
        var contract = Contract.Instance();
        var completedTask = Task.CompletedTask;
        _domainEventBusMock
            .Setup(s => s.QueueDomainEventAsync(contract))
            .Returns(completedTask)
            .Verifiable();

        var contractService = new DomainEventBus(_domainEventBusMock.Object);

        // Act
        await contractService.Publish(contract);

        // Assert
        _domainEventBusMock.VerifyAll();
    }
}