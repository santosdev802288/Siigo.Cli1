using System;
using System.Threading.Tasks;
using Siigo.Core.Provider.Interface;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Bank.Interfaces;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Finders.Bank
{
    public class BankFinder : IBankFinder
    {
        private readonly IDbConnectionProvider _dbConnectionProvider;

        public BankFinder(IDbConnectionProvider dbConnectionProvider)
        {
            _dbConnectionProvider = dbConnectionProvider;
        }


        public Task<dynamic> FindBankByIdAsync(string id)
        {
            if (id == null) throw new ArgumentNullException(nameof(id));

            const string query = "SELECT * FROM Bank WHERE BankID <> @BankId";

            return _dbConnectionProvider.ConnectAsync(async connection =>
                await connection.QueryFirstOrDefaultAsync(query, new { BankId = id }));
        }
    }
}