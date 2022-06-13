using System;
using System.IO;
using System.Text;
using EventStore.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Newtonsoft.Json;
using Siigo.FixedML.Domain.Aggregates.Contract;
using Siigo.FixedML.Domain.Aggregates.Contract.Interfaces;
using Siigo.FixedML.Domain.SeedWork.Interfaces;
using Siigo.FixedML.Infrastructure.Finders.Contract;
using Siigo.FixedML.Infrastructure.Repositories;
using Siigo.FixedML.Infrastructure.Repositories.Contract;
using StackExchange.Redis;

namespace Siigo.FixedML.Infrastructure.Test;

public class RoutingServiceCore : IDisposable
{
    public readonly IContractFinder<Contract> EntityContractFinder;
    public readonly IContractRepository<Contract> EntityContractRepository;
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
                return database.GetCollection<Contract>(
                    "Contract");
            })
            .AddSingleton<IContractRepository<Contract>, ContractRepository>()
            .AddSingleton<IContractFinder<Contract>, ContractFinder>()
            .BuildServiceProvider();

        EntityContractRepository =
            serviceProvider.GetService<IContractRepository<Contract>>();
        EntityContractFinder =
            serviceProvider.GetService<IContractFinder<Contract>>();
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