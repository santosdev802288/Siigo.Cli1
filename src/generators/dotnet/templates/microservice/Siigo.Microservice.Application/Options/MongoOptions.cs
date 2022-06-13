namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options
{
    /// <summary>
    ///     This class contains the configuration parameters that are mapped from appsettings for mongoDB
    /// </summary>
    public class MongoOptions
    {
        /// <summary>
        ///     Name section to read the configuration in appsettings
        /// </summary>
        public const string Section = "MongoDB";

        /// <summary>
        ///     Connection string for connect to mongoDB
        /// </summary>
        public string? ConnectionString { get; set; }

        /// <summary>
        ///     Name of database on mongoDB
        /// </summary>
        public string? DatabaseName { get; set; }

        /// <summary>
        ///     Name of collections
        /// </summary>
        public Collections? Collections { get; set; }
    }

    /// <summary>
    ///     This class contains the names of collections
    /// </summary>
    public class Collections
    {
        /// <summary>
        ///     Contract collection
        /// </summary>
        public string? Contract { get; set; }
    }
}

