using System.Threading;
using System.Threading.Tasks;
using MediatR;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Queries
{
    // <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Apis Architecture comment
    // Creating queries independent of the domain model, the aggregates boundaries and 
    // constraints are completely ignored gives freedom to query any table and column you might need. 
    // This approach provides great flexibility and productivity for the developers creating or updating the queries.
    public class ExampleQueryHandler : IRequestHandler<ExampleQuery, string>
    {
        private readonly IExampleFinder _exampleFinder;

        public ExampleQueryHandler(IExampleFinder exampleFinder)
        {
            _exampleFinder = exampleFinder;
        }

        public async Task<string> Handle(ExampleQuery request, CancellationToken cancellationToken)
        {
            // use your finder
            // map response with Mapster

            Example example = await _exampleFinder.FindByIdAsync(request.Id);
            return "Finder Id -> " + example.Id;
        }

    }
}
