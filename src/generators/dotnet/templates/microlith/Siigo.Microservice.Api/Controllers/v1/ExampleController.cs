using System;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Commands;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Queries;
using Siigo.Core.Security.Filter;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1
{

    [ApiController()]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
    [Authorize]
    public class ExampleController
    {
        private readonly IMediator _mediator;

        public ExampleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(string), (int) HttpStatusCode.OK)]
        public async Task<string> ExampleQuery(Guid id) => await _mediator.Send(new ExampleQuery(id));

        [HttpPost("{id}")]
        [ProducesResponseType(typeof(string), (int) HttpStatusCode.Created)]
        public async Task<string> ExampleCommand(int id) => await _mediator.Send(new ExampleCommand(id));
    }
}
