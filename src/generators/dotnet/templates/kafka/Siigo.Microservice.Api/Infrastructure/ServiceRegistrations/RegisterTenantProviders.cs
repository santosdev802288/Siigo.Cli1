using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.Core.Provider.Interface;
using Siigo.Core.Provider.Providers;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterTenantProviders : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton((ctx) =>
            {
                IControlConnectionService controlConnectionService = ctx.GetService<IControlConnectionService>();
                return new ControlProvider(controlConnectionService);
            });

            services.AddSingleton((ctx) =>
            {
                ITenantConnectionService tenantConnectionService = ctx.GetService<ITenantConnectionService>();
                IHttpContextAccessor httpContextService = ctx.GetService<IHttpContextAccessor>();
                return new TenantProvider(tenantConnectionService, httpContextService);
            });
        }
    }
}
