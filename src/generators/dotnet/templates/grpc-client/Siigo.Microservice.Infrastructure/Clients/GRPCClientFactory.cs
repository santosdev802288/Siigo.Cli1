using Grpc.Net.Client;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure
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
