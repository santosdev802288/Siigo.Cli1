using System;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace <%= config.projectPrefix %>.IntegrationTest.Fixtures
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup>
        where TStartup : class
    {
        private IServiceScope serviceScope;
        
        protected override void ConfigureClient(HttpClient client) =>  client.BaseAddress = new Uri("http://localhost");

        protected override TestServer CreateServer(IWebHostBuilder builder)
        {
            var testServer = base.CreateServer(builder);
            serviceScope = testServer.Host.Services.CreateScope();
            return testServer;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (serviceScope != null)
                {
                    serviceScope.Dispose();
                }
            }
            base.Dispose(disposing);
        }
    }
}