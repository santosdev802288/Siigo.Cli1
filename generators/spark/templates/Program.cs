using System;
using System.Diagnostics;
using System.IO;
using MatthiWare.CommandLine;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Siigo.Ms<%= config.nameUpper %>.Sync
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
                          .AddEnvironmentVariables();

                var configuration = builder.Build();

                var serviceCollection = new ServiceCollection();

                var startup = new Startup(configuration);

                startup.ConfigureServices(serviceCollection);

                var serviceProvider = serviceCollection.BuildServiceProvider();

                using var scope = serviceProvider.CreateScope();


                var accountSync = scope.ServiceProvider.GetRequiredService<AccountSync>();

                var watch = Stopwatch.StartNew();
                accountSync.Sync(options);
                watch.Stop();
                Console.WriteLine("Migracion terminada: {0} ms", watch.Elapsed.Milliseconds);

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
