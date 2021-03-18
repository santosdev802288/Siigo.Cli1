using System;
using System.Diagnostics;
using System.IO;
using MatthiWare.CommandLine;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.<%= config.nameCapitalize %>.Sync.Application.jobs;


namespace Siigo.<%= config.nameCapitalize %>.Sync
{
    class Program
{

    static int Main(string[] args)
    {
        var parser = new CommandLineParser<ProgramOptions>();
        var parsed = parser.Parse(args);
        if (parsed.HasErrors)
        {
            Console.ReadKey();
            return -1;
        }

        var options = parsed.Result;

        try
        {
            var builder = new ConfigurationBuilder()
                      .SetBasePath(Directory.GetCurrentDirectory() + "/Configuration")
                      .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                      .AddJsonFile($"appsettings.{options.Environment}.json", optional: true, reloadOnChange: true)
                      .AddEnvironmentVariables();

            var configuration = builder.Build();

            var serviceCollection = new ServiceCollection();

            var startup = new Startup(configuration);

            startup.ConfigureServices(serviceCollection);

            var serviceProvider = serviceCollection.BuildServiceProvider();

            using var scope = serviceProvider.CreateScope();

            var job = scope.ServiceProvider.GetRequiredService<Job>();

            var watch = Stopwatch.StartNew();
            job.Sync(options);
            watch.Stop();
            Console.WriteLine("Execution time taken: {0} millisecionds", watch.Elapsed.Milliseconds);

        }
        catch (Exception ex)
        {
            Console.WriteLine("Error");
            Console.WriteLine(ex.Message);
            Console.WriteLine("StackTrace");
            Console.WriteLine(ex.StackTrace);
        }

        return 0;
    }
}
}
