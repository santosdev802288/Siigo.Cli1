using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Interfaces;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Services;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Contract.Cache;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Repositories.Contract.Cache;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.ServiceRegistrations
{
    public class RegisterDatabaseInstances : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IContractRepository<Domain.Aggregates.Contract.Contract>, ContractRepository>();

            services.AddSingleton<IContractFinder<Domain.Aggregates.Contract.Contract>, ContractFinder>();

            services.Decorate<IContractFinder<Domain.Aggregates.Contract.Contract>, ContractFinderCache>();

            services.Decorate<IContractRepository<Domain.Aggregates.Contract.Contract>, ContractRepositoryCache>();

            services.AddSingleton<IContractService<Domain.Aggregates.Contract.Contract>, ContractService>();
        }
    }
}