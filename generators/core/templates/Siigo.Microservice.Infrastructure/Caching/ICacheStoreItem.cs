namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Caching
{
    public interface ICacheStoreItem
    {
        string CacheKey { get; }
    }
}
