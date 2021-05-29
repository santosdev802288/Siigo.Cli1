using Siigo.Core.Models;
using Xunit;

namespace <%= config.projectPrefix %>.Extensions.Tests.Provider.Models
{
    public class LoginConnectionTest
    {

        private readonly string _tenantConnectionString = "TenantConnectionString";


        [Fact]
        public void LoginConnectionStringTest()
        {
            var loginConnection = new LoginConnection();
            loginConnection.TenantConnectionstring = _tenantConnectionString;

            //Asserts
            Assert.Equal(_tenantConnectionString, loginConnection.TenantConnectionstring);
        }
    }
}
