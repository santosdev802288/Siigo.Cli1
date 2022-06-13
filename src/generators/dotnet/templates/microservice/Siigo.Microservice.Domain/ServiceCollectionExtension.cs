using Microsoft.Extensions.DependencyInjection;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain
{
    /// <summary>
    /// Methods of the extension to register the services in the Service Collection of .Net Core
    /// </summary>
    
    public static class ServiceCollectionExtension
    {
        /// <summary>
        /// Adds services required for application Domain.
        /// </summary>
        /// <param name="services">The Microsoft.Extensions.DependencyInjection.IServiceCollection to add the services to.</param>
        /// <returns>The Microsoft.Extensions.DependencyInjection.IServiceCollection so that additional calls can be chained.</returns>
        public static IServiceCollection AddDomain(this IServiceCollection services)
        {
            return services;
        }
    }
}