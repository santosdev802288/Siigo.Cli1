using System;
using System.Threading.Tasks;
using Mapster;
using Grpc.Core;
using Grpc.Net.Client;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure
{
    public class ClientGRPC
    {
        public ClientGRPC()
        {

        }
        public static async Task<string> SendMessage(int id)
        {
            using var channel = GrpcChannel.ForAddress("http://localhost:5002");
            var client = new Example.ExampleClient(channel);
            var reply = await client.ExampleGetIdAsync(
                              new ExampleRequest { Id = id });
            return reply.Message;
        }
    }
}
