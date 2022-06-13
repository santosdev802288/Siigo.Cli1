using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Events;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterDomainEventBus : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IDomainEventBus, DomainEventBus>();
        }
    }
}