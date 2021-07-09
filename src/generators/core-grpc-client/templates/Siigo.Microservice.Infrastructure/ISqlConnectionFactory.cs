using System.Data;
using DataAbstractions.Dapper;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure
{
    public interface ISqlConnectionFactory
    {
        IDataAccessor GetOpenConnection();
    }
}
