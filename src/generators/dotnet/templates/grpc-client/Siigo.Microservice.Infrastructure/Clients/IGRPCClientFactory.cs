using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure
{
    public interface IGRPCClientFactory
    {
        public Example.ExampleClient GetGrpcClient();
    }
}
