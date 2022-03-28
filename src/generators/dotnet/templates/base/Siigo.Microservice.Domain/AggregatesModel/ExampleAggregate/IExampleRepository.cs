using System;
using System.Threading.Tasks;
using Siigo.Core.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate
{
    public interface IExampleRepository : IRepository<Example>
    {
        public Task<Example> Create(Guid id);

        public Task<Example> Save(Example example);
    }
}
