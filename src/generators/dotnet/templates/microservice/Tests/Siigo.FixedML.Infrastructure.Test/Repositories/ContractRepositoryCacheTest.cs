using System;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using Siigo.Core.DistributedCache.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract.Cache;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories.Contract.Cache;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Repositories
{
    public class ContractRepositoryCacheTest
    {
        private readonly Mock<ICacheService> _iCacheService;
        private readonly Mock<IContractRepository<Domain.Aggregates.Contract.Contract>> _iContractRepository;

        public ContractRepositoryCacheTest()
        {
            _iCacheService = new Mock<ICacheService>();
            _iContractRepository = new Mock<IContractRepository<Domain.Aggregates.Contract.Contract>>();
        }

        [Fact]
        private void InsertAsync_Command_ReturnsSuccess()
        {
            // Arrange
            var id = Guid.NewGuid();
            var model = Contract.Instance();

            _iContractRepository
                .Setup(s => s.InsertAsync(model))
                .Returns(Task.CompletedTask)
                .Verifiable();

            ContractRepositoryCache service =
                new ContractRepositoryCache(_iCacheService.Object, _iContractRepository.Object);


            // Act
            var resultSet = service.InsertAsync(model);
            // Assert
            Assert.NotNull(resultSet);
        }

        [Fact]
        private void UpdateAsync_Command_ReturnsSuccess()
        {
            // Arrange
            var id = Guid.NewGuid();
            var model = Contract.Instance();

            _iContractRepository
                .Setup(s => s.UpdateAsync(model))
                .Returns(Task.CompletedTask)
                .Verifiable();

            _iCacheService
                .Setup(s => s.KeyDeleteAsync(id.ToString(), true, new CancellationToken()))
                .Verifiable();

            ContractRepositoryCache service =
                new ContractRepositoryCache(_iCacheService.Object, _iContractRepository.Object);

            // Act
            var resultSet = service.UpdateAsync(model);
            // Assert
            Assert.NotNull(resultSet);
        }

        [Fact]
        private void DeleteAsync_Command_ReturnsSuccess()
        {
            // Arrange
            var model = Contract.Instance();

            _iContractRepository
                .Setup(s => s.DeleteAsync(model.Id))
                .Returns(Task.CompletedTask)
                .Verifiable();

            _iCacheService
                .Setup(s => s.KeyDeleteAsync(model.Id.ToString(), true, new CancellationToken()))
                .Verifiable();

            ContractRepositoryCache service =
                new ContractRepositoryCache(_iCacheService.Object, _iContractRepository.Object);

            // Act
            var resultSet = service.DeleteAsync(model.Id);
            // Assert
            Assert.NotNull(resultSet);
        }
    }
}