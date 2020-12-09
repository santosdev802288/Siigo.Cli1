namespace Siigo.<%= config.nameCapitalize %>.Infrastructure.Caching
{
    public interface ICacheKey<TItem>
    {
        string CacheKey { get; }
    }
}
