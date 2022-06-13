using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    /// <summary>
    ///     Register all appsetting using pattern option
    /// </summary>
    internal class RegisterOptions : IServiceRegistration
    {
        /// <summary>
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration">Represents a set of key/value application configuration properties.</param>
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            var multiTenantOptions = configuration.GetSection(MultiTenantOptions.Section);
            services.Configure<MultiTenantOptions>(multiTenantOptions);
        }
    }
}