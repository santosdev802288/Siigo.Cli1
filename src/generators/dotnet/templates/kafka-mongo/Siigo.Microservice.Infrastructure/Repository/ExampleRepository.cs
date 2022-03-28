using System;
using System.Threading.Tasks;
using Mapster;
using MongoDB.Driver;

using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.ReadModels;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repository
{
    public class ExampleRepository : IExampleRepository
    {
        public IUnitOfWork UnitOfWork { get; }
        private readonly IMongoCollection<ExampleModel> _collection;

        public ExampleRepository(IMongoCollection<ExampleModel> collection)
        {  
            _collection = collection;
        }

        public Task<Example> Create(Guid id)
        {
            return Task.FromResult(new Example(){Id = id});
        }

        public async Task<Example> Save(Example example)
        {
            ExampleModel doc = example.Adapt<ExampleModel>();
            doc.AddedOn = DateTime.Now;

            await _collection.InsertOneAsync(doc);
            
            example.Id = doc.Id;

            return example;
        }
    }
}
