using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service
{
    public class ExampleGRPCService : Example.ExampleBase
    {
        private readonly ILogger<ExampleGRPCService> _logger;
        public ExampleGRPCService(ILogger<ExampleGRPCService> logger)
        {
            _logger = logger;
        }

        public override async Task<ExampleReply> ExampleGetId(ExampleRequest request, ServerCallContext context)
        {
            return new ExampleReply
            {
                Message = "Finder Id gRPC -> " + request.Id
            };
        }

    }
}
