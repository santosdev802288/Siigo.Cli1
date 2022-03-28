using System;
using Siigo.Core.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate
{
    public interface IExampleFinder : IFinder<Example, Guid> { }
}
