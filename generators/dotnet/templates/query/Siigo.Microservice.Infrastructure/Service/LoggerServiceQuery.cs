using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;

using System;
using System.Collections.Generic;
using System.Linq;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service
{
    public class LoggerServiceQuery : ILoggerServiceQuery
    {
        #region Public Methods

        public List<string> ReadLogEntryLevel()
        {
            return Enum.GetNames(typeof(LogEntryLevel)).ToList();
        }

        #endregion Public Methods
    }
}