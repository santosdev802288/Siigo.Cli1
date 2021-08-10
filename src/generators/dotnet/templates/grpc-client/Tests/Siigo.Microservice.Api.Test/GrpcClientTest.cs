using System.Threading.Tasks;
using Moq;
using Siigo.DotnetgRPCClient.Infrastructure;
using Xunit;

namespace Siigo.DotnetgRPCClient.Api.Test
{
    public class GrpcClientTest
    {

        public GrpcClientTest()
        {
        }

        [Fact]
        public async Task SendMessage()
        {
            // Arrange
            Mock<Example.ExampleClient> _server = new();
            int Id = 42;
            string message = $"Your id {Id}";
            _ = _server
                .Setup(p => p.ExampleGetId(It.IsAny<ExampleRequest>(), null, null, default))
                .Returns(new ExampleReply() { Message = message });

            ClientGRPC clientGRPC = new(new MockGRPCClientFactory(_server.Object));

            // Act
            string responseString = await clientGRPC.SendMessage(Id);

            // Assert
            Assert.Equal(message, responseString);
        }
    }
}
