
using System.IO.Compression;
using Calzolari.Grpc.AspNetCore.Validation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterGrpc : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddGrpc(
                options =>
                {
                    options.EnableDetailedErrors = true;
                    options.ResponseCompressionLevel = CompressionLevel.Fastest;
                    options.EnableMessageValidation();
                    options.Interceptors.Add<ExceptionInterceptor>();
                }
            );
            services.AddGrpcValidation();
            services.AddGrpcHttpApi();
            services.AddGrpcReflection();
        }
    }
}