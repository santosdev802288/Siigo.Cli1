using Siigo.Core.Models;
using Xunit;

namespace <%= config.projectPrefix %>.Extensions.Tests.Provider.Models
{
    public class TenantConnectionTest
    {
        [Fact]
        public void TenantConnectionStringTest()
        {
            var tenantConnection = new TenantConnection();
            tenantConnection.Login = "Login";
            tenantConnection.DatabaseName = "DatabaseName";
            tenantConnection.DBName = "DBName";
            tenantConnection.DBPass = "DBPass";
            tenantConnection.DBServer = "DBServer";
            tenantConnection.DBUser = "DBUser";
                
            //Asserts
            Assert.NotNull(tenantConnection.Login);
            Assert.NotNull(tenantConnection.DatabaseName);
            Assert.NotNull(tenantConnection.DBName);
            Assert.NotNull(tenantConnection.DBPass);
            Assert.NotNull(tenantConnection.DBServer);
            Assert.NotNull(tenantConnection.DBUser);
            
        }
    }
}
