namespace Siigo.<%= config.nameCapitalize %>.Infrastructure.Caching
{
    public interface ICacheStoreItem
    {
        string CacheKey { get; }
    }
}
