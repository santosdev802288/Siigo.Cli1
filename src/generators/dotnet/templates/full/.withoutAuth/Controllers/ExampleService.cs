using System;
using System.Threading.Tasks;
using Grpc.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;


using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Application.Queries;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Proto.V1;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Service
{
    //[Authorize("TokenAuthorize")] Uncomment for activate authentication
    public class ExampleService : Example.ExampleBase
    {
        private readonly IMediator _mediator;
        public ExampleService(IMediator mediator)
        {
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
