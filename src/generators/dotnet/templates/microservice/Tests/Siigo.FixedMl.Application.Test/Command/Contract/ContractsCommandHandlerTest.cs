using System;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Test.Command.Contract;

public class ContractsCommandHandlerTest
{
    private readonly Mock<IContractService<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>> _contractServiceMock;

    public ContractsCommandHandlerTest()
    {
        _contractServiceMock = new Mock<IContractService<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>>();
    }

    [Fact]
    public void Insert_CreateContractCommandRequest_CreateContractCommandResponse()
    {
        // Arrange
        var contract = <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract.Instance();
        var request = new CreateContractCommandRequest(contract);
        _contractServiceMock
            .Setup(s => s.InsertAsync(contract))
            .Returns(Task.CompletedTask)
            .Verifiable();

        var service = new ContractsCommandHandler(_contractServiceMock.Object);

        // Act
        var contractsQueryResponse = service.Handle(request, new CancellationToken());

        // Assert
        Assert.NotNull(contractsQueryResponse);
        Assert.NotNull(contractsQueryResponse.Result);
        Assert.True(contractsQueryResponse.Result.ContractId.ToString().Length > 0);
    }

    [Fact]
    public void Update_UpdateContractCommandRequest_UpdateContractCommandResponse()
    {
        // Arrange
        var contract = <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract.Instance();
        var request = new UpdateContractCommandRequest(contract);
        _contractServiceMock
            .Setup(s => s.UpdateAsync(contract))
            .Returns(Task.CompletedTask)
            .Verifiable();

        var service = new ContractsCommandHandler(_contractServiceMock.Object);

        // Act
        var contractsQueryResponse = service.Handle(request, new CancellationToken());

        // Assert
        Assert.NotNull(contractsQueryResponse);
        Assert.NotNull(contractsQueryResponse.Result);
    }

    [Fact]
    public void Create_UpdateContractCommandResponse_Success()
    {
        // Arrange
        var contract = <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract.Instance();
        var response = new UpdateContractCommandResponse(contract);

        // Act


        // Assert
        Assert.NotNull(response);
        Assert.NotNull(response.Contract);
    }

    [Theory]
    [InlineData("B204F758-FF0B-4A78-A3F7-CF3329BD8B43")]
    [InlineData("E959BD9D-8C5A-4382-ABE2-9D4C82F5ED3B")]
    [InlineData("96C01BF4-4A98-47B9-844A-5F08D6965D00")]
    public void Delete_DeleteContractCommandRequest_DeleteContractCommandResponse(string id)
    {
        // Arrange
        var contractId = Guid.Parse(id);
        var request = new DeleteContractCommandRequest(contractId);
        _contractServiceMock
            .Setup(s => s.DeleteAsync(contractId))
            .Returns(Task.CompletedTask)
            .Verifiable();

        var service = new ContractsCommandHandler(_contractServiceMock.Object);

        // Act
        var contractsQueryResponse = service.Handle(request, new CancellationToken());

        // Assert
        Assert.NotNull(contractsQueryResponse);
        Assert.NotNull(contractsQueryResponse.Result);
    }
}