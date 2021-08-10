
namespace Siigo.DotnetgRPCClient.Infrastructure
{
    public interface IGRPCClientFactory
    {
        public Example.ExampleClient GetGrpcClient();
    }
}
