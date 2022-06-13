using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Test.Options
{
    public class MultiTenantSettingsTest
    {
        
        private readonly string _tenantConnection  = "TenantConnection";
        private readonly string _sIIGOCloudControlConnection   = "SIIGOCloudControlConnection ";
        
        [Fact]
        public void should_create_object_when_instance_create()
        {
            var model = new MultiTenantOptions();
            model.TenantConnection = _tenantConnection;
            model.SIIGOCloudControlConnection = _sIIGOCloudControlConnection;
            
            Assert.Equal("ConnectionStrings", MultiTenantOptions.Section);
            Assert.Equal(_tenantConnection, model.TenantConnection);
            Assert.Equal(_sIIGOCloudControlConnection, model.SIIGOCloudControlConnection);
        }
    }
}