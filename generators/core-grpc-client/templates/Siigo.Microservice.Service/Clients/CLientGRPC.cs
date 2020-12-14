using System;
using System.Threading.Tasks;
using Mapster;
using Grpc.Core;
using Grpc.Net.Client;

namespace Siigo.<%= config.nameCapitalize %>.Service.Client
{
    public class CLientGRPC
    {
        public CLientGRPC()
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
