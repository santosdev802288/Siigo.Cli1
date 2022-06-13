using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    internal class RegisterHealthChecks : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            // Register HealthChecks and UI
            services.AddHealthChecks();
        }
    }
}
