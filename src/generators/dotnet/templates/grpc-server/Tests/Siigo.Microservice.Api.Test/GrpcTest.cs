using System.Threading.Tasks;
using Siigo.DotnetgRPCServer.Api.Test.Fixture;
using Siigo.DotnetgRPCServer.Infrastructure.Service;
using Grpc.Net.Client;

using Xunit;

namespace Siigo.DotnetgRPCServer.Api.Test
{
    public class GrpcTest : IClassFixture<TestServerFixture>
    {
        private readonly Example.ExampleClient _clientService;

        public GrpcTest(TestServerFixture testServerFixture)
        {
            // Arrange
            GrpcChannel channel = testServerFixture.GetGrpcChannel();
            _clientService = new Example.ExampleClient(channel);
        }

        [Fact]
        public async Task ReturnHelloWorld()
        {
            // arrange
            int Id = 42;
            ExampleRequest request = new() {Id = Id};

            // act
            ExampleReply result = await _clientService.ExampleGetIdAsync(request);

            // Assert
            Assert.Equal($"Finder Id gRPC -> {Id}", result.Message);
        }
    }
}
