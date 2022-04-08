using Autofac;
using Autofac.Extensions.DependencyInjection;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AutofacModules;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using Siigo.Core.Provider.Infraestructure.AutofacModules;
using Microsoft.AspNetCore.Mvc.Filters;
using Siigo.Core.Security.Manager;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter;
using Microsoft.Extensions.Logging;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Service;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain;

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

            services.AddDomain();

            services.AddControllers();
            services.AddHttpContextAccessor();
            services.AddHttpContextAccessor();

            services.AddGrpc();

            // gRPC Authentication 
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                var validator = new JwtTokenValidator(_configuration);
                o.SecurityTokenValidators.Add(validator);
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("TokenAuthorize", policy =>
                {
                    policy.AddRequirements(new GrpcRequireemnt());
                });
            });
            services.AddSingleton<IAuthorizationHandler, GrpcHandler>();


            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            services.AddValidatorsFromAssemblyContaining(typeof(Startup));

            services.Configure<ConfigServerData>(_configuration);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<ITokenManager, TokenManager>();
            services.AddSingleton<IAsyncAuthorizationFilter, Core.Security.Filter.AuthorizeFilter>();

            //configure autofac
            var container = new ContainerBuilder();
            container.Populate(services);
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.AddAppConfigurationsInAssembly(_configuration);

            // Si se necesita Https, agregar en la siguiente linea el certificado
            // app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
                endpoints.MapGrpcService<ExampleService>();
            });

        }


        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new InfrastructureModule(_configuration));
            builder.RegisterModule(new MediatorModule());
            builder.RegisterModule(new TenantModule());
        }
    }
}
