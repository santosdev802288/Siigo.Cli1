using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Siigo.Core.Security.Extensions;
using Steeltoe.Extensions.Configuration.ConfigServer;
using static Siigo.Core.Logs.LogExtensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            StartHostWithSiigoLogs(CreateHostBuilder, args);
        }


        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.Sources.Clear();
                    var env = hostingContext.HostingEnvironment;
                    _ = config.SetBasePath(Directory.GetCurrentDirectory() + "/Configuration")
                        .AddEnvironmentVariables()
                        .AddJsonFile("appsettings.json", true, true)
                        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                        .AddConfigServer()
                        .AddSiigoKeyVault(); // <-- Add the security config
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    _ = webBuilder
                        .UseContentRoot(Directory.GetCurrentDirectory())
                        .UseIISIntegration()
                        .UseStartup<Startup>();
                });
        }
    }
}
