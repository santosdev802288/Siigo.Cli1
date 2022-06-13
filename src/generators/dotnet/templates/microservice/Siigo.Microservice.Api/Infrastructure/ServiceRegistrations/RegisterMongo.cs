using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterMongo : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration
        )
        {
            services.Configure<MongoOptions>(configuration.GetSection(MongoOptions.Section));

            var mongoSetting = services.BuildServiceProvider()
                .GetRequiredService<IOptions<MongoOptions>>().Value;

            var mongoClient = new MongoClient(mongoSetting.ConnectionString);
            var database = mongoClient.GetDatabase(mongoSetting.DatabaseName);

            // Contract collection register
            var contractCollection = mongoSetting.Collections!.Contract;
            services.AddSingleton(s =>
                database.GetCollection<Domain.Aggregates.Contract.Contract>(contractCollection));


            // Use UUID instead LUUID
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
            BsonClassMap.RegisterClassMap<Entity<Guid>>(
                map =>
                {
                    map.AutoMap();
                    map.MapProperty(x => x.Id).SetSerializer(new GuidSerializer(BsonType.String));
                });
        }
    }    
}

