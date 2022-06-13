namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork
{
    /// <summary>
    ///     Interface to implement Domain Rules
    /// </summary>
    public interface IDomainRules
    {
        /// <summary>
        ///     Message to show on exception
        /// </summary>
        string Message { get; }

        /// <summary>
        ///     Method to check if the rules is broken
        /// </summary>
        /// <returns></returns>
        bool IsBroken();
    }    
}

