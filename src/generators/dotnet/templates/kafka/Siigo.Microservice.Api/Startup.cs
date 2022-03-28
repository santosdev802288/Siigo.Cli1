using Autofac;
using Autofac.Extensions.DependencyInjection;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Exceptions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AutofacModules;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using Siigo.Core.Provider.Infraestructure.AutofacModules;
using Microsoft.AspNetCore.Mvc.Filters;
using Siigo.Core.Security.Filter;
using Siigo.Core.Security.Manager;
using Serilog.Formatting.Json;
using Microsoft.Extensions.Logging;

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
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .WriteTo.Console(new JsonFormatter())
                .Enrich.WithExceptionDetails()
                .Filter.ByExcluding("RequestPath = '/health' and StatusCode = 200")
                .CreateLogger();

            Log.Information("Starting up" + env.EnvironmentName);
        }

        private readonly IConfiguration _configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddServicesInAssembly(_configuration);

            services.AddControllers();
            services.AddHttpContextAccessor();
            services.AddHttpContextAccessor();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            services.AddValidatorsFromAssemblyContaining(typeof(Startup));

            services.Configure<ConfigServerData>(_configuration);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<ITokenManager, TokenManager>();
            services.AddSingleton<IAsyncAuthorizationFilter, AuthorizeFilter>();

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

            app.UseSerilogRequestLogging(opts =>
            {
                opts.EnrichDiagnosticContext = LogHelper.EnrichFromRequest;
                opts.GetLevel = LogHelper.ExcludeHealthChecks; // Use the custom level
            });

            app.ConfigureExceptionHandler(_configuration);

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });

            loggerFactory.AddSerilog();
        }


        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new InfrastructureModule(_configuration));
            builder.RegisterModule(new MediatorModule());
            builder.RegisterModule(new TenantModule());
        }
    }
}
