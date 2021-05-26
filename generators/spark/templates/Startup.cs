using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Siigo.Ms<%= config.nameUpper %>.Sync
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
      services.AddScoped<AccountSync>();
    }

  }
}