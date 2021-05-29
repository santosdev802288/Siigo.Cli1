using System.Threading.Tasks;
using Siigo.Core.Domain.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate
{
    public interface IExampleFinder : IFinder<Example, int> {}
}
