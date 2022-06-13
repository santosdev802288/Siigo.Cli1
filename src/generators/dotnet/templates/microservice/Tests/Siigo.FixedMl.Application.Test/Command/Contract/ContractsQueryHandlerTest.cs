using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Commands.Contract.Validators;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.IRequest;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Queries.Contract.Validators;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Test.Command.Contract;

public class ContractsQueryHandlerTest
{
    private readonly Mock<IContractService<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>> _contractServiceMock;

    public ContractsQueryHandlerTest()
    {
        _contractServiceMock = new Mock<IContractService<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>>();
    }

    [Fact]
    public Task Select_ContractsQueryRequest_ContractsQueryResponse()
    {
        // Arrange
        var request = new ContractsQueryRequest();
        var contract = <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract.Instance();
        var
            list = new List<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>();
        list.Add(contract);
        list.Add(contract);
        list.Add(contract);
        _contractServiceMock
            .Setup(s => s.SelectAsync())
            .ReturnsAsync(list)
            .Verifiable();

        var service = new ContractsQueryHandler(_contractServiceMock.Object);

        // Act
        var contractsQueryResponse = service.Handle(request, new CancellationToken());

        // Assert
        Assert.NotNull(contractsQueryResponse);
        Assert.True(contractsQueryResponse.Result.Contracts != null && contractsQueryResponse.Result.Contracts.Any());
        return Task.CompletedTask;
    }

    [Fact]
    public void SelectById_ContractsQueryRequest_ContractsQueryResponse()
    {
        // Arrange
        var request = new ContractQueryByIdRequest();
        var contract = <%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract.Instance();
        request.ContractId = contract.Id.ToString();

        _contractServiceMock
            .Setup(s => s.SelectByIdAsync(Guid.NewGuid().ToString()))
            .ReturnsAsync(contract)
            .Verifiable();

        var service = new ContractsQueryHandler(_contractServiceMock.Object);

        // Act
        var contractsQueryResponse = service.Handle(request, new CancellationToken());
        var contractQueryByIdResponse = new ContractQueryByIdResponse
            { Contract = contractsQueryResponse.Result.Contract };

        // Assert
        Assert.NotNull(contractsQueryResponse);
        Assert.NotNull(contractQueryByIdResponse);
        Assert.NotNull(contractsQueryResponse.Result);
    }

    [Theory]
    [InlineData("B204F758-FF0B-4A78-A3F7-CF3329BD8B43")]
    [InlineData("E959BD9D-8C5A-4382-ABE2-9D4C82F5ED3B")]
    [InlineData("96C01BF4-4A98-47B9-844A-5F08D6965D00")]
    public void ValidateBar_ContractQueryByIdRequestValidator_ValidatorSuccess(string id)
    {
        // Arrange

        // Act
        var resultConstructor = new ContractQueryByIdRequestValidator();
        var result = resultConstructor.ValidateBar(id);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void ValidateBar_ContractCommandRequestValidator_ValidatorSuccess()
    {
        // Arrange
        var validator = new ContractCommandRequestValidator();

        // Act


        // Assert
        Assert.NotNull(validator);
    }
}