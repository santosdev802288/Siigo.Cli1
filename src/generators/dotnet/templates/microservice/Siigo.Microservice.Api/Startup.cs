using System.IO.Compression;
using Autofac;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Siigo.Core.Provider.Extension;
using Siigo.Core.Security.Manager;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain;
using Calzolari.Grpc.AspNetCore.Validation;
using Grpc.Reflection;
using Microsoft.AspNetCore.ResponseCompression;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api
{
    public class Startup
    {
        /// <summary>
        /// Startup Main Class
        /// </summary>
        /// <param name="env"></param>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddServicesInAssembly(_configuration);
            services.AddSiigoCoreProvider(_configuration);
            services.AddDomain();
            services.AddInfrastructure(_configuration);

            services.AddControllers();
            services.AddHttpContextAccessor();
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<BrotliCompressionProvider>();
                options.Providers.Add<GzipCompressionProvider>();
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("TokenAuthorize", policy => { policy.AddRequirements(new GrpcRequirement()); });
            });
            services.AddSingleton<IAuthorizationHandler, GrpcHandler>();
            services.Configure<ConfigServerData>(_configuration);

            services.AddSingleton<ITokenManager, TokenManager>();
            services.AddSingleton<IAsyncAuthorizationFilter, Core.Security.Filter.AuthorizeFilter>();

            
            
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.AddAppConfigurationsInAssembly(_configuration);
            
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();
            app.UseResponseCompression();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
                endpoints.MapGrpcService<ContractGrpcController>();

                if (env.IsDevelopment())
                {
                    endpoints.MapGrpcService<ReflectionServiceImpl>();
                }
            });
        }
    }
}

