using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.Core.Provider.Extension;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterTenantProviders : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSiigoCoreSqlGateway();
        }
    }
}
