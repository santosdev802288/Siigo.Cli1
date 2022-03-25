using System;
using System.Threading.Tasks;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finder
{
    public class ExampleFinder: IExampleFinder
    {

        public Task<Example> FindByIdAsync(Guid id)
        {
            // TODO
            return Task.FromResult(new Example(){Id = id});
        }
    }
}
