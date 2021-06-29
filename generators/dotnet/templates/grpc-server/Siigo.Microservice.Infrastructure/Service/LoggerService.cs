using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;

using System;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service
{
    public class LoggerService : ILoggerService
    {
        #region Public Methods

        public Action WriteLog(LogEntry entry) =>
            new(() =>
            {
                var logger = entry.Context is null ? new SiigoLogger(GetType()) : new SiigoLogger(entry.Context);

                switch (entry.Level)
                {
                    case LogEntryLevel.Trace:
                        logger.LogTrace(entry.Message);
                        break;

                    case LogEntryLevel.Debug:
                        logger.LogDebug(entry.Message);
                        break;

                    case LogEntryLevel.Information:
                        logger.LogInformation(entry.Message);
                        break;

                    case LogEntryLevel.Warning:
                        logger.LogWarning(entry.Message);
                        break;

                    case LogEntryLevel.Error:
                        logger.LogError(entry.Message);
                        break;

                    case LogEntryLevel.Critial:
                        logger.LogCritical(entry.Message);
                        break;
                }
            });

        #endregion Public Methods

    }
}