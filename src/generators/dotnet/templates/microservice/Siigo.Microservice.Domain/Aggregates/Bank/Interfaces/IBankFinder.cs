using System.Threading.Tasks;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Bank.Interfaces
{
    public interface IBankFinder
    {
        Task<dynamic> FindBankByIdAsync(string id);
    }
}
