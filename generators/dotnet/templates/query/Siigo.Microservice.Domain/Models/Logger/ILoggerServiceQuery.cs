using System;
using System.Collections.Generic;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger
{
    public interface ILoggerServiceQuery
    {
        #region Public Methods

        List<string> ReadLogEntryLevel();

        #endregion Public Methods
    }
}