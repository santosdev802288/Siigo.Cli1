
namespace Siigo.DotnetgRPCClient.Infrastructure
{
    public class MockGRPCClientFactory : IGRPCClientFactory
    {
        private readonly Example.ExampleClient _client;
        public MockGRPCClientFactory(Example.ExampleClient client)
        {
            _client = client;
        }

        public Example.ExampleClient GetGrpcClient() => _client;
    }
}
