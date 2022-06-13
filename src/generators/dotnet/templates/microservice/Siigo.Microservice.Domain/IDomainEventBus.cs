using System;
using System.Threading.Tasks;
using Siigo.Core.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain
{
    public interface IDomainEventBus
    {
        public Task Publish<T>(T entity) where T : Entity<Guid>, new();
    }
}