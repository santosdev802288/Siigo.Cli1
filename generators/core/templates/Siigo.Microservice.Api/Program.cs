using System.IO;
using Autofac.Extensions.DependencyInjection;
using Siigo.<%= config.nameCapitalize %>.Api.SeedWork;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.Net;
using System;

namespace Siigo.<%= config.nameCapitalize %>.Api
{
    public static class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseSerilog()
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.Sources.Clear();
                var env = hostingContext.HostingEnvironment;
                config.SetBasePath(Directory.GetCurrentDirectory() + "/Configuration")
                              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                              .AddJsonFile(ConfigMapFileProvider.FromRelativePath("/Configuration"), $"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
                var builtConfig = config.Build();
                if (!String.IsNullOrWhiteSpace(builtConfig["KeyVault:UrlKeyVault"]) && !String.IsNullOrWhiteSpace(builtConfig["KeyVault:APPID"]) && !String.IsNullOrWhiteSpace(builtConfig["KeyVault:APPSECRET"])) {
                    config.AddAzureKeyVault($"{builtConfig["KeyVault:UrlKeyVault"]}", builtConfig["KeyVault:APPID"], builtConfig["KeyVault:APPSECRET"]);
                }
            })
            .UseServiceProviderFactory(new AutofacServiceProviderFactory())
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>();
            });
}
}
