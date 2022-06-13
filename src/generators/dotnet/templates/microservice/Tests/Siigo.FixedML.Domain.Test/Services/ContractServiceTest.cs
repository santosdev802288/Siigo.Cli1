using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Services;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.Services;

public class ContractServiceTest
{
    private readonly Mock<IContractFinder<Contract>> _contractFinderMock;

    private readonly Mock<IContractRepository<Contract>> _contractRepositoryMock;
    private readonly Mock<IDomainEventBus> _domainEventBusMock;


    public ContractServiceTest()
    {
        _contractRepositoryMock = new Mock<IContractRepository<Contract>>();
        _contractFinderMock = new Mock<IContractFinder<Contract>>();
        _domainEventBusMock = new Mock<IDomainEventBus>();
    }

    [Theory]
    [InlineData("B204F758-FF0B-4A78-A3F7-CF3329BD8B43")]
    [InlineData("E959BD9D-8C5A-4382-ABE2-9D4C82F5ED3B")]
    [InlineData("96C01BF4-4A98-47B9-844A-5F08D6965D00")]
    public async Task SelectById_WhenSearchSingle_ReturnsContract(string contractIdExpected)
    {
        // Arrange
        var contractId = Guid.Parse(contractIdExpected);

        var contract = new Contract(contractId);

        _contractFinderMock
            .Setup(iContractFinder => iContractFinder.SelectByIdAsync(contractId))
            .ReturnsAsync(contract)
            .Verifiable();

        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);

        // Act
        var contractResult = await contractService.SelectByIdAsync(contractId.ToString());


        // Assert
        Assert.Equal(contractId, contractResult.Id);
        Assert.NotNull(contractResult);

        _contractFinderMock.VerifyAll();
    }

    [Fact]
    public async Task Select_WhenSearchSingle_ReturnsEnumerableContract()
    {
        // Arrange
        var contract = new Contract();

        var
            list = new List<Contract>();
        list.Add(contract);
        list.Add(contract);
        list.Add(contract);


        _contractFinderMock
            .Setup(iContractFinder => iContractFinder.SelectAsync())
            .ReturnsAsync(list)
            .Verifiable();

        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);

        // Act
        var contractResult = await contractService.SelectAsync();


        // Assert
        Assert.NotNull(contractResult);
        Assert.True(contractResult.Any());
        _contractFinderMock.VerifyAll();
    }

    [Fact]
    public Task Insert_WhenUniqueTransaction_ReturnsSuccess()
    {
        // Arrange

        //Service
        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);
        var contract = Contract.Instance();
        var completedTask = Task.CompletedTask;
        _contractRepositoryMock
            .Setup(s => s.InsertAsync(contract))
            .Returns(completedTask)
            .Verifiable();

        // Act
        var contractResult = contractService.InsertAsync(contract);


        // Assert
        Assert.NotNull(contractResult);
        Assert.Equal(contractResult, completedTask);
        _contractFinderMock.VerifyAll();
        return Task.CompletedTask;
    }

    [Fact]
    public Task Update_WhenUniqueTransaction_ReturnsSuccess()
    {
        // Arrange
        var contractUpdate = Contract.Instance();
        contractUpdate.ChangeEmail("changeEmail@gmail.com");
        //Service
        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);
        var contract = Contract.Instance();
        var completedTask = Task.CompletedTask;
        _contractRepositoryMock
            .Setup(s => s.UpdateAsync(contractUpdate))
            .Returns(completedTask)
            .Verifiable();

        // Act
        var contractResult = contractService.UpdateAsync(contract);


        // Assert
        Assert.NotNull(contractResult);
        Assert.NotEqual(contractUpdate.Email, contract.Email);
        _contractFinderMock.VerifyAll();
        return Task.CompletedTask;
    }

    [Fact]
    public Task UpdateDebitAmount_WhenUniqueTransaction_ReturnsSuccess()
    {
        // Arrange
        var contractUpdate = Contract.Instance();
        contractUpdate.Email = "email@email.com";

        var contractUpdateDifference = Contract.Instance();
        contractUpdateDifference.Email = "otro@email.com";

        //Update
        var contractDebitAmount = ContractDebitAmount.Instance(float.Epsilon);
        var contractDebitStatusOpen = ContractDebitStatus.Instance(ContractDebitStatusItem.Open);
        contractUpdate.Debit = ContractDebit.Instance(contractDebitAmount, contractDebitStatusOpen);


        //Difference
        var contractDebitAmountDifference = ContractDebitAmount.Instance(float.MaxValue);
        var contractDebitStatusOpenDifference = ContractDebitStatus.Instance(ContractDebitStatusItem.Closed);
        contractUpdateDifference.Debit =
            ContractDebit.Instance(contractDebitAmountDifference, contractDebitStatusOpenDifference);


        //Service
        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);

        var completedTask = Task.CompletedTask;
        _contractRepositoryMock
            .Setup(s => s.UpdateAsync(contractUpdate))
            .Returns(completedTask)
            .Verifiable();

        _contractFinderMock
            .Setup(iContractFinder => iContractFinder.SelectByIdAsync(contractUpdate.Id))
            .ReturnsAsync(contractUpdateDifference)
            .Verifiable();

        // Act
        var contractResult = contractService.UpdateAsync(contractUpdate);


        // Assert
        Assert.NotNull(contractResult);
        Assert.NotNull(contractUpdate.Debit);
        _contractFinderMock.VerifyAll();
        return Task.CompletedTask;
    }

    [Fact]
    public Task UpdateDebitGeneral_WhenUniqueTransaction_ReturnsSuccess()
    {
        // Arrange
        var contractUpdate = Contract.Instance();
        contractUpdate.Email = "email@email.com";

        var contractUpdateDifference = Contract.Instance();
        contractUpdateDifference.Email = "otro@email.com";

        //Update
        var contractDebitAmount = ContractDebitAmount.Instance(float.Epsilon);
        var contractDebitStatusOpen = ContractDebitStatus.Instance(ContractDebitStatusItem.Open);
        contractUpdate.Debit = ContractDebit.Instance(contractDebitAmount, contractDebitStatusOpen);


        //Difference
        var contractDebitAmountDifference = ContractDebitAmount.Instance(float.MaxValue);
        var contractDebitStatusOpenDifference = ContractDebitStatus.Instance(ContractDebitStatusItem.Open);
        contractUpdateDifference.Debit =
            ContractDebit.Instance(contractDebitAmountDifference, contractDebitStatusOpenDifference);


        //Service
        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);

        var completedTask = Task.CompletedTask;
        _contractRepositoryMock
            .Setup(s => s.UpdateAsync(contractUpdate))
            .Returns(completedTask)
            .Verifiable();

        _contractFinderMock
            .Setup(iContractFinder => iContractFinder.SelectByIdAsync(contractUpdate.Id))
            .ReturnsAsync(contractUpdateDifference)
            .Verifiable();

        // Act
        var contractResult = contractService.UpdateAsync(contractUpdate);


        // Assert
        Assert.NotNull(contractResult);
        Assert.NotNull(contractUpdate.Debit);
        _contractFinderMock.VerifyAll();
        return Task.CompletedTask;
    }

    [Fact]
    public Task UpdateDebitStatus_WhenUniqueTransaction_ReturnsSuccess()
    {
        // Arrange
        var contractUpdate = Contract.Instance();
        contractUpdate.Email = "email@email.com";

        var contractUpdateDifference = Contract.Instance();
        contractUpdateDifference.Email = "otro@email.com";

        //Update
        var contractDebitAmount = ContractDebitAmount.Instance(float.Epsilon);
        var contractDebitStatusOpen = ContractDebitStatus.Instance(ContractDebitStatusItem.Open);
        contractUpdate.Debit = ContractDebit.Instance(contractDebitAmount, contractDebitStatusOpen);


        //Difference
        var contractDebitAmountDifference = ContractDebitAmount.Instance(float.MaxValue);
        var contractDebitStatusOpenDifference = ContractDebitStatus.Instance(ContractDebitStatusItem.Open);
        contractUpdateDifference.Debit =
            ContractDebit.Instance(contractDebitAmountDifference, contractDebitStatusOpenDifference);
        contractUpdateDifference.ChangeDebitStatus(ContractDebitStatusItem.Open);


        //Service
        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);

        var completedTask = Task.CompletedTask;
        _contractRepositoryMock
            .Setup(s => s.UpdateAsync(contractUpdate))
            .Returns(completedTask)
            .Verifiable();

        _contractFinderMock
            .Setup(iContractFinder => iContractFinder.SelectByIdAsync(contractUpdate.Id))
            .ReturnsAsync(contractUpdateDifference)
            .Verifiable();

        // Act
        var contractResult = contractService.UpdateAsync(contractUpdate);


        // Assert
        Assert.NotNull(contractResult);
        Assert.NotNull(contractUpdate.Debit);
        Assert.NotNull(contractUpdate.Debit.Status);
        Assert.NotNull(contractUpdate.Debit.Amount);
        _contractFinderMock.VerifyAll();
        return Task.CompletedTask;
    }


    [Theory]
    [InlineData("B204F758-FF0B-4A78-A3F7-CF3329BD8B43")]
    [InlineData("E959BD9D-8C5A-4382-ABE2-9D4C82F5ED3B")]
    [InlineData("96C01BF4-4A98-47B9-844A-5F08D6965D00")]
    public Task Delete_WhenUniqueTransaction_ReturnsSuccess(string contractIdExpected)
    {
        // Arrange
        var contractId = Guid.Parse(contractIdExpected);
        //Service
        var contractService = new ContractService(_contractRepositoryMock.Object, _contractFinderMock.Object,
            _domainEventBusMock.Object);

        var completedTask = Task.CompletedTask;
        _contractRepositoryMock
            .Setup(s => s.DeleteAsync(contractId))
            .Returns(completedTask)
            .Verifiable();

        // Act
        var contractResult = contractService.DeleteAsync(contractId);


        // Assert
        Assert.NotNull(contractResult);
        _contractFinderMock.VerifyAll();
        return Task.CompletedTask;
    }
}