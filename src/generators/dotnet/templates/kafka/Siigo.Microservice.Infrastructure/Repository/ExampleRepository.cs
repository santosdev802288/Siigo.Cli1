using System;
using System.Threading.Tasks;
using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repository
{
    public class ExampleRepository : IExampleRepository
    {
        public IUnitOfWork UnitOfWork { get; }

        public Task<Example> Create(Guid id)
        {
            return Task.FromResult(new Example(){Id = id});
        }

        public Task<Example> Save(Example example)
        {
            throw new NotImplementedException();
        }
    }
}
