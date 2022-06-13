using System;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using MongoDB.Driver;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories.Contract
{
    public class ContractRepository : IContractRepository<Domain.Aggregates.Contract.Contract>
    {
        private readonly IMongoCollection<Domain.Aggregates.Contract.Contract> _collection;

        public ContractRepository(IMongoCollection<Domain.Aggregates.Contract.Contract> collection)
        {
            _collection = collection;
        }

        public Task InsertAsync(Domain.Aggregates.Contract.Contract entity)
        {
            entity.OccurredAt = Timestamp.FromDateTime(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc));
            return _collection.InsertOneAsync(entity);
        }

        public Task UpdateAsync(Domain.Aggregates.Contract.Contract entity)
        {
            return _collection.ReplaceOneAsync(contract => contract.Id == entity.Id, entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _collection.DeleteOneAsync(contract => contract.Id == id);
        }
    }
}