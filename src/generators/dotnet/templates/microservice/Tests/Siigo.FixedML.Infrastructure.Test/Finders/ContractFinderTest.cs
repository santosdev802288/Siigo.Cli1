using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Moq;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Finders;

public class ContractFinderTest
{
    private readonly Mock<IContractFinder<Contract>> _iContractFinder;
    private readonly Mock<IMongoCollection<Contract>> _imongoCollection;

    public ContractFinderTest()
    {
        _imongoCollection = new Mock<IMongoCollection<Contract>>();
        _iContractFinder = new Mock<IContractFinder<Contract>>();
    }

    [Fact]
    private void Select_Finder_ReturnsSuccess()
    {
        // Arrange
        var contract = Contract.Instance();
        var contractFinderService = new ContractFinder(_imongoCollection.Object);
        var list = new List<Contract>();
        list.Add(contract);
        list.Add(contract);
        list.Add(contract);
        IEnumerable<Contract> enumerable = list;
        _iContractFinder
            .Setup(s => s.SelectAsync())
            .ReturnsAsync(enumerable)
            .Verifiable();

        // Act
        var resultSet = contractFinderService.SelectAsync();
        // Assert
        Assert.NotNull(resultSet);
    }

    [Fact]
    private void SelectById_Finder_ReturnsSuccess()
    {
        // Arrange
        var contractFinderService = new ContractFinder(_imongoCollection.Object);
        var model = Contract.Instance();
        var taskResult = new Task<Contract>(Function);
        _iContractFinder
            .Setup(s => s.SelectByIdAsync(model.Id))
            .Returns(taskResult)
            .Verifiable();

        // Act
        var resultSet = contractFinderService.SelectByIdAsync(model.Id);
        // Assert
        Assert.NotNull(resultSet);
    }

    private Contract Function()
    {
        var model = Contract.Instance();
        return model;
    }
}