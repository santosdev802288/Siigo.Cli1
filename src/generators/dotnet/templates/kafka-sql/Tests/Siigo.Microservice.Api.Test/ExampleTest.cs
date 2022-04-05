using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Xunit;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Test.Fixture;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Proto.V1;


namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Test
{
    public class ExampleTest : IClassFixture<TestServerFixture>
    {
        private readonly Example.ExampleClient _clientService;

        public ExampleTest(TestServerFixture testServerFixture)
        {
            // Arrange
            GrpcChannel channel = testServerFixture.GetGrpcChannel();
            _clientService = new Example.ExampleClient(channel);
        }

        [Fact]
        public async Task ReturnHelloWorld()
        {
            // arrange
            string Id = "0f8fad5b-d9cb-469f-a165-70867728950e";
            ExampleRequest request = new() {Id = Id};

            Metadata headers = new()
            {
                { "Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFFNjY0RkJCMkY4OUMwQjhEOTgxMTYwQTVBMEVEMjhCNjk3MDkzQUNSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6InJtWlB1eS1Kd0xqWmdSWUtXZzdTaTJsd2s2dyJ9.eyJuYmYiOjE2NDg4Mjc1NTAsImV4cCI6MTY0ODkxMzk1MCwiaXNzIjoiaHR0cDovL21zLXNlY3VyaXR5c2VydmljZTo1MDAwIiwiYXVkIjoiaHR0cDovL21zLXNlY3VyaXR5c2VydmljZTo1MDAwL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IlNpaWdvV2ViIiwic3ViIjoiMzE2NzU0IiwiYXV0aF90aW1lIjoxNjQ4ODI3NTUwLCJpZHAiOiJsb2NhbCIsIm5hbWUiOiJhZG1pbkBjb25zdHJ1LmNvbSIsIm1haWxfc2lpZ28iOiJhZG1pbkBjb25zdHJ1LmNvbSIsImNsb3VkX3RlbmFudF9jb21wYW55X2tleSI6IkVNUFJFU0FERUNPTlNUUlVDQ0lPTkFJVUxUREEiLCJ1c2Vyc19pZCI6IjUiLCJ0ZW5hbnRfaWQiOiIweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTE2MDY0IiwidXNlcl9saWNlbnNlX3R5cGUiOiIwIiwicGxhbl90eXBlIjoiMTMiLCJ0ZW5hbnRfc3RhdGUiOiIxIiwibXVsdGl0ZW5hbnRfaWQiOiIzNCIsImNvbXBhbmllcyI6IjIiLCJhcGlfc3Vic2NyaXB0aW9uX2tleSI6IiIsImFjY291bnRhbnQiOiJmYWxzZSIsImp0aSI6IkEzQTkwRkE0RkFBRjk2MkJDOUZDQzkzOUIzOURBOEY2IiwiaWF0IjoxNjQ4ODI3NTUwLCJzY29wZSI6WyJXZWJBcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiY3VzdG9tIl19.QAdnDtAycXCcJSY8vwJ-FfZ19KF49lllO9kWOFyi-eKDYbjkBDHlcSKVIECTBYd7RRCUKpCBUO-bxHNvdn7VQRy1v5EYVptV28prMJeYSq3EoW8Cw4SzkTr7byVz8uU36gew_-33HrHOAgLpMqSt0AyunNNE0eGbEqubDNMjQevOxe7n_kkHZgef3jSL3t3CIzSQdONdCL-zSsFsdrLGKoIIrcq9NTMrlNltFNOlacnKpp5UomBZW2vZxzksaze2HPN9vz4dBZphVlLy-i5CqLb0jTatrCGyoEN1vy98TsqRkQ9KBYE78o_o5VwaYPHIsKYVcKxse7lUK6EzwQR4iA" }
            };

            // act
            ExampleReply result = await _clientService.ExampleByIdAsync(request, headers);

            // Assert
            Assert.Equal($"Finder Id -> {Id}", result.Message);
        }
    }
}
