using System;
using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterMediatR : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            // Scan assemblies and add handlers, preprocessors, and postprocessors implementations to the container.

            var assemblyApi = typeof(Startup).GetTypeInfo().Assembly;
            
            var assemblyApplication = AppDomain.CurrentDomain.Load("Siigo.<%= config.nameCapitalize %>.Application");
            var assemblyDomain = AppDomain.CurrentDomain.Load("Siigo.<%= config.nameCapitalize %>.Domain");
            var assemblyInfrastructure = AppDomain.CurrentDomain.Load("Siigo.<%= config.nameCapitalize %>.Infrastructure");
            
            services.AddSingleton(
                typeof(IPipelineBehavior<,>), 
                typeof(RequestValidationBehavior<,>)
            );
            
            services.AddMediatR(assemblyApi, assemblyApplication, assemblyDomain, assemblyInfrastructure); 
        }
    }
}
