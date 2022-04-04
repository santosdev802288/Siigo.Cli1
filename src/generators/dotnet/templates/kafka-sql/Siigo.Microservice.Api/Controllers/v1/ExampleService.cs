using System;
using System.Threading.Tasks;
using Grpc.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Queries;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Proto.V1;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Service
{
    [Authorize("TokenAuthorize")]
    public class ExampleService : Example.ExampleBase
    {
        private readonly ILogger<ExampleService> _logger;
        private readonly IMediator _mediator;
        public ExampleService(ILogger<ExampleService> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        public override async Task<ExampleReply> ExampleById(ExampleRequest request, ServerCallContext context)
        {
            return new ExampleReply(){
                Message = await _mediator.Send(new ExampleQuery(Guid.Parse(request.Id)))
            };
        }

    }
}
