using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions
{
    public interface ICustomAppBuilder
    {
        void ConfigureApp(IApplicationBuilder app, IConfiguration configuration);
    }
}
