using System;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger
{
    public interface ILoggerService
    {
        #region Public Methods

        Action WriteLog(LogEntry entry);

        #endregion Public Methods
    }
}
