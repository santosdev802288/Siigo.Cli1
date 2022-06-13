using System;
using System.Collections.Generic;
using System.Threading;
using Contract.V1;
using Google.Protobuf.WellKnownTypes;
using MediatR;
using Moq;
using Siigo.FixedML.Api.Controllers.v1;
using Siigo.FixedML.Application.Commands.Contract;
using Siigo.FixedML.Application.Queries.Contract.IRequest;
using Xunit;

namespace Siigo.FixedML.Api.Test.Controllers
{
    public class GrpcControllerTest
    {
        private readonly Mock<IMediator> _imediator;


        public GrpcControllerTest()
        {
            _imediator = new Mock<IMediator>();
        }

        [Fact]
        private void FindContracts_Controller_ReturnsSuccess()
        {
            // Arrange   
            ContractGrpcController controller = new ContractGrpcController(_imediator.Object);

            var contract = new Domain.Aggregates.Contract.Contract();

            var list = new List<Domain.Aggregates.Contract.Contract>();
            list.Add(contract);
            list.Add(contract);
            list.Add(contract);
            IEnumerable<Domain.Aggregates.Contract.Contract> en = list;
            var response = new ContractsQueryResponse(en);
            _imediator
                .Setup(s => s.Send(new ContractsQueryRequest(), new CancellationToken()))
                .ReturnsAsync(response)
                .Verifiable();

            // Act
            var resultSet = controller.FindContracts(new Empty(), null);
            // Assert
            Assert.NotNull(resultSet);
        }

        [Fact]
        private void FindContractById_Controller_ReturnsSuccess()
        {
            // Arrange
            Domain.Aggregates.Contract.Contract contract = Domain.Aggregates.Contract.Contract.Instance();
            ContractGrpcController controller = new ContractGrpcController(_imediator.Object);
            var request = new FindContractByIdRequest();
            request.ContractId = Guid.NewGuid().ToString();
            ContractQueryByIdResponse response = new ContractQueryByIdResponse();
            response.Contract = contract;
            _imediator
                .Setup(s => s.Send(request, new CancellationToken()))
                .ReturnsAsync(response)
                .Verifiable();

            // Act
            var resultSet = controller.FindContractById(request, null);
            // Assert
            Assert.NotNull(resultSet);
        }

        [Fact]
        private void CreateContract_Controller_ReturnsSuccess()
        {
            // Arrange
            ContractGrpcController controller = new ContractGrpcController(_imediator.Object);
            var request = LoadContractRequest();
            CreateContractCommandResponse response = new CreateContractCommandResponse(Guid.NewGuid());
            _imediator
                .Setup(s => s.Send(request, new CancellationToken()))
                .ReturnsAsync(response)
                .Verifiable();

            // Act
            var resultSet = controller.CreateContract(request, null);
            // Assert
            Assert.NotNull(resultSet);
        }
        
        [Fact]
        private void UpdateContract_Controller_ReturnsSuccess()
        {
            // Arrange
            ContractGrpcController controller = new ContractGrpcController(_imediator.Object);
            var request = LoadContractRequestUpdate();
            var contract = Domain.Aggregates.Contract.Contract.Instance();
            UpdateContractCommandResponse response = new UpdateContractCommandResponse(contract);
            _imediator
                .Setup(s => s.Send(request, new CancellationToken()))
                .ReturnsAsync(response)
                .Verifiable();

            // Act
            var resultSet = controller.UpdateContract(request, null);
            // Assert
            Assert.NotNull(resultSet);
        }
        
        [Fact]
        private void DeleteContract_Controller_ReturnsSuccess()
        {
            // Arrange
            ContractGrpcController controller = new ContractGrpcController(_imediator.Object);
            var request = new DeleteContractRequest();
            request.ContractId = Guid.NewGuid().ToString();
            DeleteContractCommandResponse response = new DeleteContractCommandResponse();
            _imediator
                .Setup(s => s.Send(request, new CancellationToken()))
                .ReturnsAsync(response)
                .Verifiable();

            // Act
            var resultSet = controller.DeleteContract(request, null);
            // Assert
            Assert.NotNull(resultSet);
        }
        
        private static CreateContractRequest LoadContractRequest()
        {
            CreateContractRequest createContract = new CreateContractRequest();
            Contract.V1.Contract Contract = new  Contract.V1.Contract();
            Contract.Cost = 0;
            Contract.Activated = true;
            Contract.Address = "calle 74 58b 32";
            Contract.Email = "string@gmail.com";
            createContract.Contract = Contract;
            return createContract;
        }

        private static UpdateContractRequest LoadContractRequestUpdate()
        {
            UpdateContractRequest createContract = new UpdateContractRequest();
            Contract.V1.Contract Contract = new  Contract.V1.Contract();
            Contract.Id = Guid.NewGuid().ToString();
            Contract.Cost = 0;
            Contract.Activated = true;
            Contract.Address = "calle 74 58b 32";
            Contract.Email = "string@gmail.com";
            createContract.Contract = Contract;
            return createContract;
        }
    }
}