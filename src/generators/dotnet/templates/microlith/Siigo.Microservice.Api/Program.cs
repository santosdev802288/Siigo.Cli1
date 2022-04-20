using System.IO;
using Autofac.Extensions.DependencyInjection;
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
            CreateHostBuilder(args).Build().Run();
        }
            

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.Sources.Clear();
                    IHostEnvironment env = hostingContext.HostingEnvironment;
                    _ = config.SetBasePath(Directory.GetCurrentDirectory() + "/Configuration")
                                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                                .AddConfigServer()
                                .AddSiigoKeyVault(); // <-- Add the security config
                })
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    _ = webBuilder
                        .UseContentRoot(Directory.GetCurrentDirectory())
                        .UseIISIntegration()
                        .UseStartup<Startup>();
                });
    }
}
