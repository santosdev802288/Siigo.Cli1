using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Siigo.Core.Domain.SeedWork;

namespace Siigo.<%= config.nameCapitalize %>.Infrastructure
{
    public class MongoDBContext : IUnitOfWork
    {
        private readonly IMediator _mediator;

        public MongoDBContext(IConfiguration configuration, IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            var mongoClient = new MongoClient(configuration.GetSection("BookstoreDatabaseSettings").GetSection("ConnectionString").Value);
            var database = mongoClient.GetDatabase(configuration.GetSection("BookstoreDatabaseSettings").GetSection("DatabaseName").Value);
        }
        
        public void Dispose()
        {
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }
        
    }
}
