using System;
using System.Threading.Tasks;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finder
{
    public class ExampleFinder: IExampleFinder
    {

        public async Task<Example> FindByIdAsync(Guid id)
        {
            Example example = new (){Id = id};
            example.Message = "Respose ok";

            return example;
        }
    }
}
