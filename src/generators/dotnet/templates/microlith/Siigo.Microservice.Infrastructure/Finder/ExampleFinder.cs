using System;
using System.Threading.Tasks;
using Siigo.Core.Provider.Interface;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.AggregateModel.ExampleAggregate;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finder
{
    public class ExampleFinder: IExampleFinder
    {
        private readonly ITenantProvider _tenantProvider;

        public ExampleFinder(ITenantProvider tenantProvider)
        {
            _tenantProvider = tenantProvider;
        }


        public async Task<Example> FindByIdAsync(Guid id)
        {
            Example example = new (){Id = id};

            using (var connection = await _tenantProvider.GetTenantConnectionAsync())
            {
                const string query = "SELECT COUNT(1) as message FROM Country c WHERE CountryCode <> @ExampleID";
                var browserDataItemDto = await connection.QueryFirstOrDefaultAsync(query, new { ExampleID = id.ToString() });
                example.Message = Convert.ToString(browserDataItemDto);
            }
            return example;
        }
    }
}
