using System.Data;
using DataAbstractions.Dapper;

namespace Siigo.<%= config.nameCapitalize %>.Infrastructure
{
    public interface ISqlConnectionFactory
    {
        IDataAccessor GetOpenConnection();
    }
}
