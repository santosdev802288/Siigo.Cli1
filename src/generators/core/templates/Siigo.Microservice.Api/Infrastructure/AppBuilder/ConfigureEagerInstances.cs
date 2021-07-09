using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using SlimMessageBus;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AppBuilder
{
    /// <summary>
    /// 
    /// </summary>
    public class ConfigureEagerInstances : ICustomAppBuilder
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="app"></param>
        /// <param name="configuration"></param>
        public void ConfigureApp(IApplicationBuilder app, IConfiguration configuration)
        {
            app.ApplicationServices.GetService<IMessageBus>();
        }
    }
}
