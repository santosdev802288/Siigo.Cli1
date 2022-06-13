using System;
using System.IO;
using System.Text;
using EventStore.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Newtonsoft.Json;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories.Contract;
using StackExchange.Redis;

namespace Siigo.IntegrationTest;

public class RoutingServiceCore : IDisposable
{
    public readonly IContractFinder<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract> EntityContractFinder;
    public readonly IContractRepository<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract> EntityContractRepository;
    public readonly IEventStoreRepository EventStoreRepository;

    public IDatabase Database;

    public RoutingServiceCore()
    {
        Console.WriteLine("Creating and Starting Containers");
        //Event Store
        var eventStoreConnection = EventStoreClientSettings.Create("esdb://localhost:2113/?tls=false"
        );

        IEventStoreRepository eventStoreRepository = new EventStoreRepository(eventStoreConnection);
        //Event Store

        //Mongo Db

        var mongoConfig = GetConfiguration("MongoDB");

        //Mongo Db

        Console.WriteLine("Initializing dependencies");

        var serviceProvider = new ServiceCollection()
            .AddSingleton(eventStoreConnection)
            .AddSingleton(eventStoreRepository)
            .AddSingleton(s =>
            {
                var mongoClient = new MongoClient("mongodb://localhost:27000");
                var database = mongoClient.GetDatabase("dbProduct");
                return database.GetCollection<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>(
                    "Contract");
            })
            .AddSingleton<IContractRepository<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>, ContractRepository>()
            .AddSingleton<IContractFinder<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>, ContractFinder>()
            .BuildServiceProvider();

        EntityContractRepository =
            serviceProvider.GetService<IContractRepository<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>>();
        EntityContractFinder =
            serviceProvider.GetService<IContractFinder<<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Contract>>();
        EventStoreRepository = serviceProvider.GetService<IEventStoreRepository>();
    }


    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    public static IConfiguration GetConfiguration(string stringconnection)
    {
        var appSettings = new
        {
            EventStore = new
            {
                ConnectionString = "esdb://eventstore.eastus2.cloudapp.azure.com:2113/?tls=false"
            },
            MongoDB = new
            {
                ConnectionString =
                    "mongodb+srv://siigo-catalog-qa-dbProduct:ZS8BfbGpqa7PCvsp@siigo-catalog-qa.u7fhi.azure.mongodb.net/dbProduct?retryWrites=true&w=majority",
                DatabaseName = "dbProduct",
                Collections = new
                {
                    contract = "Contract"
                }
            }
        };

        var json = JsonConvert.SerializeObject(appSettings);

        var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(json));

        return new ConfigurationBuilder().AddJsonStream(memoryStream)
            .Build();
    }
}