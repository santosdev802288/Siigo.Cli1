using System.Threading.Tasks;
using Siigo.Core.Domain.SeedWork;
using Siigo.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace Siigo.<%= config.nameCapitalize %>.Infrastructure.Repository
{
    public class ExampleRepository: IExampleRepository
    {
        public IUnitOfWork UnitOfWork { get; }
        
        public Task<Domain.AggregateModel.ExampleAggregate.Example> Create(int id)
        {
            return Task.FromResult(new Domain.AggregateModel.ExampleAggregate.Example(id));
        }
    }
}
