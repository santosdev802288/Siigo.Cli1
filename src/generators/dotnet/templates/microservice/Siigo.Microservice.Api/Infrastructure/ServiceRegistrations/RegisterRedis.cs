using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.Core.DistributedCache.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    internal class RegisterRedis : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            // Redis configuration
            services.AddSiigoCache(configuration);
        }
    }
}
