namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options
{
    /// <summary>
    /// This class contains the parameters the configuration that are mapped from appsettings
    /// </summary>
    public class MultiTenantOptions
    {
        /// <summary>
        /// Name section to read the configuration in appsettings
        /// </summary>
        public const string Section = "ConnectionStrings";

        /// <summary>
        /// Template for connection string to SQL Server
        /// </summary>
        public string? TenantConnection { get; set; }

        /// <summary>
        /// Connection string for cloud control database 
        /// </summary>
        public string? SIIGOCloudControlConnection { get; set; }
    }
}