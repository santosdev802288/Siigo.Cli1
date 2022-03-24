using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.ReadModels;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterMongo : IServiceRegistration
    {
        static RegisterMongo()
        {
            // Use UUID instead LUUID
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
        }

        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            IConfiguration mongoConfig = configuration.GetSection("MongoDB");

            services.AddSingleton(s =>
            {
                var mongoClient = new MongoClient(mongoConfig.GetSection("ConnectionString").Value);
                var database = mongoClient.GetDatabase(mongoConfig.GetSection("DatabaseName").Value);
                return database.GetCollection<ExampleModel>(mongoConfig.GetSection("Collections:Request").Value);
            });
        }
    }
}
