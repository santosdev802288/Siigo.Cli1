namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger
{
    public enum LogEntryLevel
    {
        Trace,

        Debug,

        Information,

        Warning,

        Error,

        Critial
    }
}