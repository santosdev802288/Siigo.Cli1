using System;
using System.Threading.Tasks;
using Siigo.Core.DistributedCache.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories.Contract.Cache
{
    public class ContractRepositoryCache : IContractRepository<Domain.Aggregates.Contract.Contract>
    {
        private readonly ICacheService _cacheService;
        private readonly IContractRepository<Domain.Aggregates.Contract.Contract> _contractRepository;

        public ContractRepositoryCache(ICacheService cacheService,
            IContractRepository<Domain.Aggregates.Contract.Contract> contractRepository)
        {
            _cacheService = cacheService;
            _contractRepository = contractRepository;
        }

        public Task InsertAsync(Domain.Aggregates.Contract.Contract entity)
        {
            return _contractRepository.InsertAsync(entity);
        }

        public async Task UpdateAsync(Domain.Aggregates.Contract.Contract entity)
        {
            //Release Cache and Put Item Updated
            await _contractRepository.UpdateAsync(entity);
            await _cacheService.KeyDeleteAsync(entity.Id.ToString());
        }

        public async Task DeleteAsync(Guid id)
        {
            //Release Item Cache
            await _contractRepository.DeleteAsync(id);
            await _cacheService.KeyDeleteAsync(id.ToString());
        }
    }
}