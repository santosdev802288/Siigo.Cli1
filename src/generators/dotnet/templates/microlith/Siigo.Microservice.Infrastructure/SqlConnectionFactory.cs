using System;
using System.Data;
using System.Data.SqlClient;
using DataAbstractions.Dapper;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure
{
    public class SqlConnectionFactory : ISqlConnectionFactory, IDisposable
    {
        private readonly string _connectionString;
        private IDataAccessor _connection;

        public SqlConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDataAccessor GetOpenConnection()
        {
            if (_connection == null || _connection.State != ConnectionState.Open)
            {
                _connection = new DataAccessor(new SqlConnection(_connectionString));
                _connection.Open();
            }

            return this._connection;
        }

        public void Dispose()
        {
           Dispose(true);
           GC.SuppressFinalize(this);
        }
        
        protected virtual void Dispose(bool disposing)
        {
            // Cleanup
            if (_connection != null && _connection.State == ConnectionState.Open)
            {
                _connection.Dispose();
            }
        }
    }
}
