using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using Siigo.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace Siigo.<%= config.nameCapitalize %>.Service.Services
{
    public class ExampleService : Example.ExampleBase
    {
        private readonly ILogger<ExampleService> _logger;
        private readonly IExampleFinder _exampleFinder;
        public ExampleService(ILogger<ExampleService> logger, IExampleFinder exampleFinder)
        {
            _logger = logger;
            _exampleFinder = exampleFinder;
        }

        public override async Task<ExampleReply> ExampleGetId(ExampleRequest request, ServerCallContext context)
        {
            var example = await _exampleFinder.FindByIdAsync(request.Id);
            return new ExampleReply
            {
                Message = "Finder Id gRPC -> " + request.Id
            };
        }

    }
}
