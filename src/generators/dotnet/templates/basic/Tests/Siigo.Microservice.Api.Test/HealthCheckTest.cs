using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Test
{
    public class HealthCheckTest
    {
        private readonly HttpClient _client;

        public HealthCheckTest()
        {
            // Arrange
            TestServer server = new(new WebHostBuilder().UseStartup<Startup>());
            _client = server.CreateClient();
        }

        [Fact]
        public async Task ReturnHelloWorld()
        {
            // Act
            HttpResponseMessage response = await _client.GetAsync("/health");
            _ = response.EnsureSuccessStatusCode();
            string responseString = await response.Content.ReadAsStringAsync();

            // Assert
            Assert.Equal("Healthy", responseString);
        }
    }
}
