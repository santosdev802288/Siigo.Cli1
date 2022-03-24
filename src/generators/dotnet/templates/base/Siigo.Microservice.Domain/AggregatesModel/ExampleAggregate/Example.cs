using System;
using Siigo.Core.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate
{
    public class Example : IAggregateRoot, IDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
    }
}
