using System.Threading.Tasks;
using Newtonsoft.Json;
using MediatR;
using SlimMessageBus;

using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Dto;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Commands;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.EventHandler
{
    public class ExampleConsumer: IConsumer<ExampleRequest>
    {
        private readonly IMediator _mediator;

        public ExampleConsumer(IMediator mediator)
        {
           _mediator = mediator;
        }

        public async Task OnHandle(ExampleRequest message, string path)
        {  
            SiigoLog.LogInformation($"Event:{path} message:{JsonConvert.SerializeObject(message)}");
               
            await _mediator.Send(new ExampleCommand(message.Id, message.Message));
        }
    }
}