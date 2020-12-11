using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Siigo.<%= config.nameCapitalize %>.Api.Application.Commands;
using Siigo.<%= config.nameCapitalize %>.Api.Application.Queries;
using Siigo.<%= config.nameCapitalize %>.Service.Client;

namespace Siigo.<%= config.nameCapitalize %>.Api.Controllers.v1
{

    [ApiController()]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
    public class ExampleControllerHttp2
    {
        private readonly IMediator _mediator;

        public ExampleControllerHttp2(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<string> ExampleQuery(int id)
            => await CLientGRPC.SendMessage(id);

    }
}
