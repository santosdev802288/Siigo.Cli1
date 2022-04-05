using System;
using System.Threading.Tasks;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate
{
    public class ExampleProcess {

        private readonly IExampleFinder _finder;

        public ExampleProcess(IExampleFinder finder)
        {
            _finder = finder;
        }

        public async Task<Example> FindExample(Guid id)
        {
            Example example = await _finder.FindByIdAsync(id);
            return example;
        }
    }
}
