namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Caching
{
    public interface ICacheKey<TItem>
    {
        string CacheKey { get; }
    }
}
