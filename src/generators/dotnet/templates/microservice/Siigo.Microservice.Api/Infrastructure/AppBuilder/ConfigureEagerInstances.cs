using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using SlimMessageBus;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AppBuilder
{
    [ExcludeFromCodeCoverage]
    public class ConfigureEagerInstances : ICustomAppBuilder
    {
        /// <summary>
        /// </summary>
        /// <param name="app"></param>
        /// <param name="configuration"></param>
        public void ConfigureApp(IApplicationBuilder app, IConfiguration configuration)
        {
            app.ApplicationServices.GetService<IMessageBus>();
            app.ApplicationServices.GetService<IContractFinder<Domain.Aggregates.Contract.Contract>>();
            app.ApplicationServices.GetService<IContractRepository<Domain.Aggregates.Contract.Contract>>();
        }
    }
}