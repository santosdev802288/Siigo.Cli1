// unset


using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterMvc : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            // Add framework services.
            services
                .AddMvc()
                .AddControllersAsServices(ServiceLifetime.Singleton);
            
            services.AddApiVersioning(config =>
            {
                // Specify the default API Version
                config.DefaultApiVersion = new ApiVersion(1, 0);
                // If the client hasn't specified the API version in the request, use the default API version number
                config.AssumeDefaultVersionWhenUnspecified = true;
                // Advertise the API versions supported for the particular endpoint
                config.ReportApiVersions = true;
                
                config.ApiVersionReader = new UrlSegmentApiVersionReader();
            });

            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddLocalization();
        }
    }

    public static class MvcExtension
    {
        public static IMvcBuilder AddControllersAsServices(
            this IMvcBuilder builder, ServiceLifetime lifetime)
        {
            var feature = new ControllerFeature();
            builder.PartManager.PopulateFeature(feature);

            foreach (var controller in feature.Controllers.Select(c => c.AsType()))
            {
                builder.Services.Add(ServiceDescriptor.Describe(controller, controller, lifetime));
            }

            builder.Services.Replace(ServiceDescriptor
                .Transient<IControllerActivator, ServiceBasedControllerActivator>());

            return builder;
        }
    }
}