using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Siigo.Core.DistributedCache.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract.Cache
{
    /// <summary>
    /// Implementation cache for <see cref="ContractFinder"/> using Scrutor.
    /// </summary>
    public class ContractFinderCache : IContractFinder<Domain.Aggregates.Contract.Contract>
    {
        private readonly ICacheService _cacheService;
        private readonly IContractFinder<Domain.Aggregates.Contract.Contract> _contractFinder;

        public ContractFinderCache(ICacheService cacheService,
            IContractFinder<Domain.Aggregates.Contract.Contract> finder)
        {
            this._cacheService = cacheService;
            this._contractFinder = finder;
        }

        public async Task<Domain.Aggregates.Contract.Contract> SelectByIdAsync(Guid contractId)
        {
            var resultFromCache = await
                _cacheService.GetCacheValueAsync<Domain.Aggregates.Contract.Contract>(contractId.ToString());

            if (resultFromCache != null)
                return resultFromCache;

            var resultFromDataBase = await _contractFinder.SelectByIdAsync(contractId);
            await _cacheService.SetCacheValueAsync(contractId.ToString(), resultFromDataBase);

            return resultFromDataBase;
        }

        public async Task<IEnumerable<Domain.Aggregates.Contract.Contract>> SelectAsync()
        {
            return await _contractFinder.SelectAsync();
        }
    }
}