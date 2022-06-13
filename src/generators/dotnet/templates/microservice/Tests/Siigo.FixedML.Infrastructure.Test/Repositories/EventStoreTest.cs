

using System.Linq;
using System.Threading.Tasks;
using EventStore.Client;
using Moq;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Repositories;

public class EventStoreTest
{
    private readonly Mock<EventStoreClientSettings> _eventStoreClientSettings;
    private readonly Mock<IEventStoreRepository> _iEventStoreRepository;

    public EventStoreTest()
    {
        _eventStoreClientSettings = new Mock<EventStoreClientSettings>();
        _iEventStoreRepository = new Mock<IEventStoreRepository>();
    }

    [Fact]
    private void SaveAsync_InsertEvent_ReturnsSuccess()
    {
        // Arrange
        var model = Contract.Instance();
        model.ChangeEmail("email@email.com");
        var contractFinderService = new EventStoreRepository(_eventStoreClientSettings.Object);
        var completedTask = Task.CompletedTask;

        var evt = model.DomainEvents?.ToArray();
        var streamName = $"{model.GetType().Name}-{model.Id}";

        _iEventStoreRepository.Setup(repository => repository.SaveAsync(streamName, evt[0]))
            .Returns(completedTask);


        foreach (var domainEvent in evt)
        {
            // Act
            var resultSet = contractFinderService.SaveAsync(model.GetType().ToString(), domainEvent);
            // Assert
            Assert.NotNull(resultSet);
        }

        
    }
}