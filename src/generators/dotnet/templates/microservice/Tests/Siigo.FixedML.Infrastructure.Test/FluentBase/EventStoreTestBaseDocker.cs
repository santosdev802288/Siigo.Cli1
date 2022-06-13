using Ductus.FluentDocker.Builders;
using Ductus.FluentDocker.Services.Extensions;
using Ductus.FluentDocker.XUnit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.FluentBase
{
    
    public class EventStoreTestBaseDocker : FluentDockerTestBase
    {
        
        private const string EventoStoreConnectionString = "{0}:{1},allowAdmin=true";
        
        public string ConnectionString;

        
        protected override ContainerBuilder Build()
        {
            return new Builder()
                .UseContainer()
                .UseImage("eventstore/eventstore:latest")
                .Command("--insecure --run-projections=All --enable-external-tcp --enable-atom-pub-over-http")
                .ExposePort(2113)
                .ExposePort(1113)
                .WaitForPort("2113/tcp", 60000 /*60s*/, "127.0.0.1");
        }

        protected override void OnContainerInitialized()
        {
            var endPoint = base.Container.ToHostExposedEndpoint("2113/tcp");

            this.ConnectionString = string.Format(EventoStoreConnectionString, endPoint.Address, endPoint.Port);
        }
    }
}

