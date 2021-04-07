using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Exceptions;
using Siigo.<%= config.nameCapitalize %>.Api.Infrastructure.AutofacModules;
using Siigo.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using Siigo.<%= config.nameCapitalize %>.Api.SeedWork;
using Siigo.<%= config.nameCapitalize %>.Service.Services;
using Siigo.Core.Infraestructure.AutofacModules;
using Siigo.Core.Interface;
using Siigo.Core.Provider;
using Siigo.<%= config.nameCapitalize %>.Infrastructure;
using SlimMessageBus;
using SlimMessageBus.Host.AspNetCore;
using SlimMessageBus.Host.Config;
using SlimMessageBus.Host.Kafka;
using SlimMessageBus.Host.Kafka.Configs;
using SlimMessageBus.Host.Serialization.Json;
using Siigo.Core.Trace;
using Siigo.Core.Trace.abstracts;
using Siigo.<%= config.nameCapitalize %>.Domain.Exception;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc.Filters;
using Siigo.Core.Filter;
using Siigo.Core.Manager;
using Microsoft.AspNetCore.Mvc.Versioning;
using Serilog.Formatting.Json;


namespace Siigo.<%= config.nameCapitalize %>.Api
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
            services.AddScoped((ctx) =>
            {
                IControlConnectionService controlConnectionService = ctx.GetService<IControlConnectionService>();
                return new ControlProvider(controlConnectionService);
            });

            services.AddScoped((ctx) =>
            {
                ITenantConnectionService tenantConnectionService = ctx.GetService<ITenantConnectionService>();
                IHttpContextAccessor httpContextService = ctx.GetService<IHttpContextAccessor>();
                return new TenantProvider(tenantConnectionService, httpContextService);
            });

            services.AddGrpc();

            services.AddApplicationInsightsTelemetry();
            services.AddControllers();
            services.AddCustomMvc(_configuration);
            services.AddHealthChecks();
            services.AddCustomIntegrations();
            services.AddCustomDbContext(_configuration);
            services.AddMediatR(typeof(Startup).GetTypeInfo().Assembly);
            services.AddHttpContextAccessor();
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            services.AddValidatorsFromAssemblyContaining(typeof(Startup));

            services.Configure<ConfigServerData>(_configuration);

            // Configure Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Siigo.<%= config.nameCapitalize %> API", Version = "V1" });
                //First we define the security scheme
                c.AddSecurityDefinition("Bearer", //Name the security scheme
                    new OpenApiSecurityScheme
                    {
                        Description = "JWT Authorization header using the Bearer scheme.",
                        Type = SecuritySchemeType.Http, //We set the scheme type to http since we're using bearer authentication
                        Scheme = "bearer" //The name of the HTTP Authorization scheme to be used in the Authorization header. In this case "bearer".
                    });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference{
                                Id = "Bearer", //The name of the previously defined security scheme.
                                Type = ReferenceType.SecurityScheme
                            }
                        },new List<string>()
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            // Si se produce el envio de un evento, configurar y retirar el comentario la siguiente linea
            // services.AddSingleton(BuildMessageBus);
            services.AddSingleton<IRequestResponseBus>(svp => svp.GetService<IMessageBus>());
            services.AddSingleton<ITracingEngine, TracingEngine>();
            services.AddSingleton<ITokenManager, TokenManager>();
            services.AddSingleton<IAsyncAuthorizationFilter, AuthorizeFilter>();
            //configure autofac
            var container = new ContainerBuilder();
            container.Populate(services);
            ConfigureModelBindingExceptionHandling(services);
        }

        private IMessageBus BuildMessageBus(IServiceProvider serviceProvider)
        {
            var tracingEngine = serviceProvider.GetService<ITracingEngine>();
            var onMessageProduced = tracingEngine.OnMessageProduced(new Dictionary<string, object>
            {
                // {"siigo", "tech"}
            });

            var onMessageArrived = tracingEngine.OnMessageArrived(new Dictionary<string, object>
            {
                // {"siigo", "tech"}
            });
            return MessageBusBuilder
                .Create()
                .WithSerializer(new JsonMessageSerializer())
                .WithProviderKafka(new KafkaMessageBusSettings(_configuration.GetSection("kafka").GetSection("brokerUrl").Value)
                {
                    ProducerConfig = (config) =>
                    {
                        config.LingerMs = Double.Parse(_configuration.GetSection("kafka").GetSection("producerConfig").GetSection("LingerMs").Value);
                        config.SocketNagleDisable = bool.Parse(_configuration.GetSection("kafka").GetSection("producerConfig").GetSection("socket.nagle.disable").Value);
                    },
                    ConsumerConfig = (config) =>
                    {
                        config.FetchErrorBackoffMs = Int32.Parse(_configuration.GetSection("kafka").GetSection("consumerConfig").GetSection("fetch.error.backoff.ms").Value);
                        config.StatisticsIntervalMs = Int32.Parse(_configuration.GetSection("kafka").GetSection("consumerConfig").GetSection("statistics.interval.ms").Value);
                        config.SocketNagleDisable = bool.Parse(_configuration.GetSection("kafka").GetSection("consumerConfig").GetSection("socket.nagle.disable").Value);
                        config.SessionTimeoutMs = Int32.Parse(_configuration.GetSection("kafka").GetSection("consumerConfig").GetSection("SessionTimeoutMs").Value);
                        config.MaxPollIntervalMs = Int32.Parse(_configuration.GetSection("kafka").GetSection("consumerConfig").GetSection("MaxPollIntervalMs").Value);
                    }
                })
                // Si se produce el envio de un evento, configurar y retirar los comentarios de las siguientes lineas
                // a continuación un ejemplo:
                // .Produce<AccountIntegrationEvent>(x =>
                // {
                //     x.DefaultTopic(_configuration["AutocompleteThirdPartyTopic"]);
                //     x.AttachEvents(events =>
                //     {
                //         // Invoke the action for the specified message type published/sent via the bus:
                //         events.OnMessageProduced = (bus, producerSettings, message, name) =>
                //         {
                //         };
                //     });
                // })
                .AttachEvents(events =>
                {
                    events.OnMessageProduced = onMessageProduced;
                    events.OnMessageArrived = onMessageArrived;
                })
                .WithDependencyResolver(new AspNetCoreMessageBusDependencyResolver(serviceProvider))
                .Build();
        }

        private void ConfigureModelBindingExceptionHandling(IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    ValidationProblemDetails error = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .Select(e => new ValidationProblemDetails(actionContext.ModelState)).FirstOrDefault();
                    var errorField = error.Errors.Last().Key;
                    var field = Regex.Replace(errorField, "[^A-Za-z0-9_ ]", "");
                    var errorValue = error.Errors.Values.Last()[0];
                    Match match = Regex.Match(errorValue, ".+?(?=Path)");
                    var message = match.Success ? match.Value : errorValue;
                    throw new BadRequestException("invalid_type", $"Tipo de dato inválido: {field}.", message);
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
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
                endpoints.MapGrpcService<ExampleService>();
            });

            // Use swagger Doc
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Siigo.<%= config.nameCapitalize %> Template API Example");
            });

            app.ApplicationServices.GetService<IMessageBus>();

        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new InfrastructureModule(_configuration));
            builder.RegisterModule(new MediatorModule());
            builder.RegisterModule(new TenantModule());
        }
    }

    static class CustomExtensionsMethods
    {
        public static IServiceCollection AddCustomIntegrations(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<SqlServerDbContext>();

            return services;
        }

        public static IServiceCollection AddCustomMvc(this IServiceCollection services, IConfiguration configuration)
        {
            // Add framework services.
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddControllersAsServices();
                /*  Enable this if you want to force SnakeCase 
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.DictionaryKeyPolicy = SnakeCaseNamingPolicy.Instance;
                    options.JsonSerializerOptions.PropertyNamingPolicy = SnakeCaseNamingPolicy.Instance;
                });
                */

            services.AddApiVersioning(config =>
            {
                // Specify the default API Version
                config.DefaultApiVersion = new ApiVersion(1, 0);
                // If the client hasn't specified the API version in the request, use the default API version number
                config.AssumeDefaultVersionWhenUnspecified = true;
                // Advertise the API versions supported for the particular endpoint
                config.ReportApiVersions = true;

                // /api/{version}
                config.ApiVersionReader = new UrlSegmentApiVersionReader();
            });

            services.AddRouting(options => options.LowercaseUrls = true);


            services.AddLocalization();

            // Redis configuration
            services.AddDistributedRedisCache(option =>
            {
                option.Configuration = configuration["RedisConnection"];
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()); // Disable this line to local development
                        //.AllowAnyOrigin()); // Enable this line to local development
            });

            return services;
        }

        public static IServiceCollection AddCustomDbContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            // The instance of the DbContext object has to have its service lifetime 
            // set to ServiceLifetime.Scoped, which is the default lifetime when 
            // registering a DbContext with services.AddDbContext
            services.AddDbContext<SqlServerDbContext>(options =>
            {
                options.UseSqlServer(configuration["SQLServerConnection"]);
            });

            return services;
        }
    }

    /// <summary>
    ///  Configure Snake case default json response in APIs
    /// </summary>
    public class SnakeCaseNamingPolicy : JsonNamingPolicy
    {
        public static SnakeCaseNamingPolicy Instance { get; } = new SnakeCaseNamingPolicy();

        public override string ConvertName(string name)
        {
            // Conversion to other naming conventaion goes here. Like SnakeCase, KebabCase etc.
            return name.ToSnakeCase();
        }
    }

    /// <summary>
    /// Util Extensions to write fields in json response (snakeCase)
    /// </summary>
    public static class StringUtils
    {
        public static string ToSnakeCase(this string str)
        {
            return string.Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
        }
    }

}
