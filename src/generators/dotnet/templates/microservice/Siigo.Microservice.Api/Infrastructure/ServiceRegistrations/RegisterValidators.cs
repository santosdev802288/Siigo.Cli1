using System;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterValidators : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            var assembly = AppDomain.CurrentDomain.Load("Siigo.<%= config.nameCapitalize %>.Application");

            AssemblyScanner
                .FindValidatorsInAssembly(assembly)
                .ForEach(item => services.AddScoped(item.InterfaceType, item.ValidatorType));
        }
    }
    
}

