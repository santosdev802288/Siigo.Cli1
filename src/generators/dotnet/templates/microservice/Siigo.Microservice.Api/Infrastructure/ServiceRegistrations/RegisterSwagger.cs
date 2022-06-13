using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    internal class RegisterSwagger : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            // Configure Swagger
            services.AddSwaggerGen(c =>
            {
                
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "gRPC HTTP API Contracts", Version = "v1" });
                

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                

                c.IncludeXmlComments(xmlPath);
            });
            
            services.AddGrpcSwagger();
        }
    }
}
