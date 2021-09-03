using System.Threading;
using System.Threading.Tasks;
using Mapster;
using MediatR;
using <%= config.name %>.Application.Model;

namespace <%= config.name %>.Application.Queries
{
    // <%= config.name %>s Architecture comment
    // Creating queries independent of the domain model, the aggregates boundaries and 
    // constraints are completely ignored gives freedom to query any table and column you might need. 
    // This approach provides great flexibility and productivity for the developers creating or updating the queries.
    public class OrderQueryHandler : IRequestHandler<OrderQuery, IContract>
    {

        public OrderQueryHandler(/*inject your finder*/)
        {
        }

        public async Task<IContract> Handle(OrderQuery request, CancellationToken cancellationToken)
        {
            // use your finder
            // map response with Mapster
            return await Task.FromResult<>(null);
        }
        
    }
}
