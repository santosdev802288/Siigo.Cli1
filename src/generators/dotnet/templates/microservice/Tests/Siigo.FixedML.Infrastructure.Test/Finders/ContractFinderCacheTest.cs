using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Moq;
using Siigo.Core.DistributedCache.Interfaces;
using Siigo.Core.DistributedCache.Options;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract.Cache;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Finders
{
    public class ContractFinderCacheTest
    {
        private readonly Mock<ICacheService> _iCacheService;
        private readonly Mock<IContractFinder<Contract>> _iContractFinder;

        public ContractFinderCacheTest()
        {
            _iCacheService = new Mock<ICacheService>();
            _iContractFinder = new Mock<IContractFinder<Contract>>();
        }

        [Fact]
        private void SelectByIdAsync_Finder_ReturnsSuccessCache()
        {
            // Arrange
            var id = Guid.NewGuid();

            var contract = Contract.Instance();
            _iCacheService
                .Setup(s => s.GetCacheValueAsync<Contract>(id.ToString(), true, new CancellationToken()))
                .ReturnsAsync(contract)
                .Verifiable();
            
            ContractFinderCache service = new ContractFinderCache(_iCacheService.Object, _iContractFinder.Object);
            

            // Act
            var resultSet = service.SelectByIdAsync(id);
            // Assert
            Assert.NotNull(resultSet);
        }
        
        [Fact]
        private void SelectByIdAsync_Finder_ReturnsWrongCache()
        {
            // Arrange
            var id = Guid.NewGuid();
            _iCacheService
                .Setup(s => s.GetCacheValueAsync<Contract>(id.ToString(), true, new CancellationToken()))
                .Verifiable();
            
            ContractFinderCache service = new ContractFinderCache(_iCacheService.Object, _iContractFinder.Object);
            

            // Act
            var resultSet = service.SelectByIdAsync(id);
            // Assert
            Assert.NotNull(resultSet);
        }

        [Fact]
        private void SelectAsync_Finder_ReturnsSuccess()
        {
            // Arrange
            var contract = Contract.Instance();
            var list = new List<Contract>();
            list.Add(contract);
            list.Add(contract);
            list.Add(contract);
            IEnumerable<Contract> enumerable = list;

            ContractFinderCache service = new ContractFinderCache(_iCacheService.Object, _iContractFinder.Object);
            _iContractFinder
                .Setup(s => s.SelectAsync())
                .ReturnsAsync(enumerable)
                .Verifiable();

            // Act
            var resultSet = service.SelectAsync();
            // Assert
            Assert.NotNull(resultSet);
        }
    }
}