using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

using Siigo.Core.Logs;
using Siigo.Core.OpenAPI;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service;

using System;
using System.Collections.Generic;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api
{
    public class Startup
    {
        #region Private Fields

        private readonly IWebHostEnvironment _environment;

        #endregion Private Fields

        #region Public Constructors

        /// <summary>
        /// Startup Main Class
        /// </summary>
        /// <param name="env"></param>
        public Startup(IWebHostEnvironment env)
        {
            _environment = env;
            SiigoLog.LogInformation($"Starting up: {_environment.EnvironmentName}");
        }

        #endregion Public Constructors

        #region Public Methods

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (IsDevelopment(env))
            {
                app.UseDeveloperExceptionPage();
                app.UseSiigoOpenAPI("Logger");
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddHealthChecks();
            services.AddSiigoOpenAPI(new OpenApiInfo
            {
                Title = "<%= config.nameCapitalize %>",
                Description = "API for <%= config.nameCapitalize %>",
                License = new OpenApiLicense
                {
                    Name = "MIT",
                    Url = new Uri("https://mit-license.org/")
                },
                Version = "v1",
                Contact = new OpenApiContact
                {
                    Name = "<%= config.nameDev  %>",
                    Email = "<%= config.userSiigo %>"
                }
            });

            if (IsDevelopment(_environment))
            {
                services.AddSingleton<ILoggerServiceCommand, LoggerServiceCommand>();
            }
        }

        #endregion Public Methods

        #region Private Methods

        private static bool IsDevelopment(IWebHostEnvironment env)
        {
            return new List<string> { "development", "local", "testing" }.Contains(env.EnvironmentName.ToLowerInvariant());
        }

        #endregion Private Methods
    }
}