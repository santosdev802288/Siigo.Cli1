using System.Threading.Tasks;
using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repository
{
    public class ExampleRepository : IExampleRepository
{
    public IUnitOfWork UnitOfWork { get; }

    public Task<Domain.AggregateModel.ExampleAggregate.Example> Create(int id)
    {
        return Task.FromResult(new Domain.AggregateModel.ExampleAggregate.Example(id));
    }
}
}
