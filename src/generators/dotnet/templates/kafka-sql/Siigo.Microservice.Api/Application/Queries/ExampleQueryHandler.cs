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
        private readonly ExampleProcess _process;

        public ExampleQueryHandler(ExampleProcess process)
        {
            _process = process;
        }

        public async Task<string> Handle(ExampleQuery request, CancellationToken cancellationToken)
        {
            // map response with Mapster

            Example example = await _process.FindExample(request.Id);
            return $"Id {example.Id}. Message: {example.Message}";
        }

    }
}
