using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract.Cache;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract
{
    /// <summary>
    /// This Class is cacheable on <see cref="ContractFinderCache"/>>
    /// </summary>
    public class ContractFinder : IContractFinder<Domain.Aggregates.Contract.Contract>
    {
        private readonly IMongoCollection<Domain.Aggregates.Contract.Contract> _collection;

        public ContractFinder(IMongoCollection<Domain.Aggregates.Contract.Contract> collection)
        {
            _collection = collection;
        }

        public Task<Domain.Aggregates.Contract.Contract> SelectByIdAsync(Guid contractId)
        {
            var filter = Builders<Domain.Aggregates.Contract.Contract>.Filter.Eq("_id", contractId.ToString());
            return _collection.Find(filter).FirstAsync();
        }

        public async Task<IEnumerable<Domain.Aggregates.Contract.Contract>> SelectAsync()
        {
            var filter = Builders<Domain.Aggregates.Contract.Contract>.Filter.Empty;
            return await _collection.Find(filter).ToListAsync();
        }
    }
}

