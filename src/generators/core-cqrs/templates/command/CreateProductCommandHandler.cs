using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace <%= config.name %>.Application.Commands
{
    /// <summary>
    /// Handler which processes the command when
    /// customer executes cancel order from app
    /// </summary>
    public class <%= config.command_name %>CommandHandler : IRequestHandler<<%= config.command_name %>Command, int>
    {
        // Add any injected repository/helper/util 
        // or any class needed to handle the command
        public <%= config.command_name %>CommandHandler()
        {
        }

        public async Task<int> Handle(<%= config.command_name %>Command request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(1);
        }
    }
}
