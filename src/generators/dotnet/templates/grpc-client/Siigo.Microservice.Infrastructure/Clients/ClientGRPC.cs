using System;
using System.Threading.Tasks;
using Mapster;
using Grpc.Core;
using Grpc.Net.Client;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure
{
    public class ClientGRPC
    {
        private readonly Example.ExampleClient client;

        public ClientGRPC() : this(new GRPCClientFactory())
        {
        }

        public ClientGRPC(IGRPCClientFactory factory)
        {
            client = factory.GetGrpcClient();
        }

        public async Task<string> SendMessage(int id)
        {
            ExampleReply reply = client.ExampleGetId(new ExampleRequest { Id = id });
            return reply.Message;
        }
    }
}
