using Ductus.FluentDocker.Builders;
using Ductus.FluentDocker.Services.Extensions;
using Ductus.FluentDocker.XUnit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.FluentBase
{
    
    public class MongoTestBaseDocker : FluentDockerTestBase
    {
        
        private const string EventoStoreConnectionString = "{0}:{1},allowAdmin=true";
        
        public string ConnectionString;

        
        protected override ContainerBuilder Build()
        {
            return new Builder()
                .UseContainer()
                .UseImage("mongo:latest")
                .ReuseIfExists()
                .ExposePort(27018)
                .WaitForPort("27018/tcp",  60000 /*60s*/, "127.0.0.1");
        }

        protected override void OnContainerInitialized()
        {
            var endPoint = base.Container.ToHostExposedEndpoint("27018/tcp");

            this.ConnectionString = string.Format(EventoStoreConnectionString, endPoint.Address, endPoint.Port);
        }
    }
}

