using System.Threading.Tasks;
using Newtonsoft.Json;
using MediatR;
using SlimMessageBus;

using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Dto;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Queries;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Consumer
{
    public class RequestConsumer: IConsumer<RequestDto>
    {
        private readonly IMediator _mediator;

        public RequestConsumer(IMediator mediator)
        {
           _mediator = mediator;
        }

        public async Task OnHandle(RequestDto message, string path)
        {  
            
            SiigoLog.LogInformation($"Event:{path} message:{JsonConvert.SerializeObject(message)}");
               
            await _mediator.Send(new ExampleQuery(message.Id));
        }
    }
}