﻿using Autofac;
using Microsoft.Extensions.Configuration;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure;
using Serilog;
using Serilog.Core;
using Siigo.Core.Interface;
using Siigo.Core.Provider;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finder;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repository;


namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.AutofacModules
{
    /// <summary>
    /// Register all infrastructure related objects
    /// </summary>
    public class InfrastructureModule : Module
    {
        private readonly string _databaseConnectionString;
        private readonly IConfiguration _configuration; 
        

        public InfrastructureModule(IConfiguration configuration)
        {
            _configuration = configuration;
            _databaseConnectionString = _configuration["SqlServerConnection"];
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<SqlConnectionFactory>()
                .As<ISqlConnectionFactory>()
                .WithParameter("connectionString", _databaseConnectionString)
                .InstancePerLifetimeScope();

            //  Repository’s lifetime should usually be set as scoped

            builder.RegisterInstance(_configuration).As<IConfiguration>();
            builder.RegisterType<TenantProvider>()
                .As<ITenantProvider>()
                .SingleInstance();

            builder
                .RegisterType<ExampleFinder>()
                .As<IExampleFinder>()
                .SingleInstance();

            builder
                .RegisterType<ExampleRepository>()
                .As<IExampleRepository>()
                .SingleInstance();
            
            builder.RegisterType<Logger>().As<ILogger>().InstancePerLifetimeScope();
        }
    }
}