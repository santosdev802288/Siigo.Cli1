using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Siigo.<%= config.nameCapitalize %>.Sync.Application.jobs;
using Siigo.<%= config.nameCapitalize %>.Sync.Application.utils;

namespace Siigo.<%= config.nameCapitalize %>.Sync
{
    public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(ServiceCollection services)
    {
        services.AddSingleton(provider => _configuration);
        services.AddScoped<Job>();
        services.AddScoped<Cryptography>();
    }

}
}