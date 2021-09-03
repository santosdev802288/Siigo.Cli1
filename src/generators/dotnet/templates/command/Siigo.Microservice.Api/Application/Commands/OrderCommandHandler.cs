using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace <%= config.name %>.Application.Commands
{
    /// <summary>
    /// Handler which processes the command when
    /// customer executes cancel order from app
    /// </summary>
    public class OrderCommandHandler : IRequestHandler<OrderCommand, int>
    {
        // Add any injected repository/helper/util 
        // or any class needed to handle the command
        public OrderCommandHandler()
        {
        }

        public async Task<int> Handle(OrderCommand request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(1);
        }
    }
}
