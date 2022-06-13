using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using Siigo.IntegrationTest.FluentBase;
using Xunit;

namespace Siigo.IntegrationTest.Finders
{
    public class ContractFinderTest : MongoTestBaseDocker
    {
        private IContractFinder<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract> _entityContractFinder;
        private RoutingServiceCore _serviceCore;

        public ContractFinderTest()
        {
            GlobalSetup();
        }

        private void GlobalSetup()
        {
            _serviceCore = new RoutingServiceCore();
            _entityContractFinder = _serviceCore.EntityContractFinder;
            Console.WriteLine("GlobalSetup");
        }


        [Theory]
        [InlineData("E959BD9D-8C5A-4382-ABE2-9D4C82F5ED3B")]
        private void SelectById_WhenUniqueTransaction_ReturnsSuccess(string contractIdExpected)
        {
            // Arrange
            var contractId = Guid.Parse(contractIdExpected);

            // Act
            var resultById = _entityContractFinder.SelectByIdAsync(contractId);
            var resultByAll = _entityContractFinder.SelectAsync();

            // Assert
            Assert.NotNull(resultById);
            Assert.NotNull(resultByAll);
        }
    }
}