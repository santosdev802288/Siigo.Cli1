using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Siigo.DotnetgRPCServer.Api.Test.Fixture
{
    public sealed class TestServerFixture : IDisposable
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly GrpcChannel channel;

        public TestServerFixture()
        {
            _factory = new WebApplicationFactory<Startup>();
            HttpClient client = _factory.CreateDefaultClient(new ResponseVersionHandler());
            channel = GrpcChannel.ForAddress(client.BaseAddress, new GrpcChannelOptions
            {
                HttpClient = client
            });
        }

        public GrpcChannel GetGrpcChannel() => channel;

        public void Dispose() => _factory.Dispose();

        private class ResponseVersionHandler : DelegatingHandler
        {
            protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
                CancellationToken cancellationToken)
            {
                HttpResponseMessage response = await base.SendAsync(request, cancellationToken);
                response.Version = request.Version;
                return response;
            }
        }
    }
}
