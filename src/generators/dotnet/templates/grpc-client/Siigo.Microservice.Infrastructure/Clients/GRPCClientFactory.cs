using Grpc.Net.Client;

namespace Siigo.DotnetgRPCClient.Infrastructure
{
    public class GRPCClientFactory : IGRPCClientFactory
    {

        public Example.ExampleClient GetGrpcClient()
        {
            using GrpcChannel channel = GrpcChannel.ForAddress("http://localhost:5002");
            return new Example.ExampleClient(channel);
        }
    }
}
