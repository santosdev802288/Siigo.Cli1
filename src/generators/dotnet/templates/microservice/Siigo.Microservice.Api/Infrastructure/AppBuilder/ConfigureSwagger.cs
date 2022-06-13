using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AppBuilder
{
    /// <summary>
    /// 
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class ConfigureSwagger : ICustomAppBuilder
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        /// <param name="configuration"></param>
        public void ConfigureApp(IApplicationBuilder app, IConfiguration configuration)
        {
            // Use swagger Doc
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "gRPC HTTP API Contracts");
            });
        }
    }
}
