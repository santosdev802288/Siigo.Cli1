using System.ComponentModel.DataAnnotations;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger
{
    /// <summary>
    /// Represent a log entry
    /// </summary>
    public class LogEntry
    {
        #region Public Properties

        /// <summary>
        /// The log context; the class where it was called
        /// </summary>
        public string? Context { get; init; }

        /// <summary>
        /// The level of the log entry
        /// </summary>
        public LogEntryLevel Level { get; init; } = LogEntryLevel.Information;

        /// <summary>
        /// The message of the log entry
        /// </summary>
        [Required]
        public string Message { get; init; } = string.Empty;

        #endregion Public Properties
    }
}