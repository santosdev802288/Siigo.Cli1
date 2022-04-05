using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Commands
{
    /// <summary>
    /// Handler which processes the command when
    /// customer executes cancel order from app
    /// </summary>
    public class ExampleCommandHandler : IRequestHandler<ExampleCommand, string>
    {
        private readonly IExampleRepository _exampleRepository;

        // Add any injected repository/helper/util 
        // or any class needed to handle the command
        public ExampleCommandHandler(IExampleRepository exampleRepository)
        {
            _exampleRepository = exampleRepository;
        }

        public async Task<string> Handle(ExampleCommand command, CancellationToken cancellationToken)
        {
            Example request = new(){ Id = Guid.NewGuid(), Message = command.Message};
            Example example = await _exampleRepository.Save(request);
            return $"Repository id {example.Id}";
        }
    }
}
