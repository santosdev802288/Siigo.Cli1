using System.Threading.Tasks;
using Siigo.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace Siigo.<%= config.nameCapitalize %>.Infrastructure.Finder
{
    public class ExampleFinder: IExampleFinder
    {

        public Task<Domain.AggregateModel.ExampleAggregate.Example> FindByIdAsync(int id)
        {
            // TODO
            return Task.FromResult(new Domain.AggregateModel.ExampleAggregate.Example(id));
        }
    }
}
