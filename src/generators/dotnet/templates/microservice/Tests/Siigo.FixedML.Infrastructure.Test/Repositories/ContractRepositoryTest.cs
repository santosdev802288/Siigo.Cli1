using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.FluentBase;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Repositories;

public class ContractRepositoryTest : MongoTestBaseDocker
{
    private IContractRepository<Contract> _entityContractRepository;
    private RoutingServiceCore _serviceCore;

    public ContractRepositoryTest()
    {
        GlobalSetup();
    }

    private void GlobalSetup()
    {
        _serviceCore = new RoutingServiceCore();
        _entityContractRepository = _serviceCore.EntityContractRepository;
        Console.WriteLine("GlobalSetup");
    }


    [Fact]
    private void Insert_Repository_ReturnsSuccess()
    {
        // Arrange
        var model = Contract.Instance();

        // Act
        var result = _entityContractRepository.InsertAsync(model);

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    private void Update_Repository_ReturnsSuccess()
    {
        // Arrange
        var model = Contract.Instance();

        // Act
        model.ChangeEmail("another@gmail.com");
        var resultUpdate = _entityContractRepository.UpdateAsync(model);

        // Assert
        Assert.NotNull(resultUpdate);
    }

    [Fact]
    private void Delete_Repository_ReturnsSuccess()
    {
        // Arrange
        var model = Contract.Instance();

        // Act
        var resultUpdate = _entityContractRepository.DeleteAsync(model.Id);

        // Assert
        Assert.NotNull(resultUpdate);
    }
}