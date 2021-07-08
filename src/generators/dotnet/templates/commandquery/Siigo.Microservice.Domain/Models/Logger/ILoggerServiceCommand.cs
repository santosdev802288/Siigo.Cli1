using System;
using System.Collections.Generic;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger
{
    public interface ILoggerServiceCommand
    {
        #region Public Methods

        Action WriteLog(LogEntry entry);

        #endregion Public Methods
    }
}