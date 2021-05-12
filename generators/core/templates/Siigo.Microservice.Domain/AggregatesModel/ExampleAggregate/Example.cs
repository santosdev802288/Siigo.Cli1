using Siigo.Core.Domain.SeedWork;

namespace Siigo.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate
{
    public class Example: IAggregateRoot, IDto
    {
        public int Id { get; set; }

        public Example(int id)
        {
            Id = id;
        }
    }
}
