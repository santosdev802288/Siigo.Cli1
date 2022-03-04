using Moq;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Models.Logger;
using System;

using Xunit;
using Microsoft.AspNetCore.Mvc;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Test
{
    public class LogControllerTest
    {
        #region Private Fields

        private static LogEntry _logEntryResult = null;

        #endregion Private Fields

        #region Public Methods

        [Fact]
        public void WriteLog_Success()
        {
            foreach (LogEntryLevel item in Enum.GetValues(typeof(LogEntryLevel)))
            {
                var _logEntry = new PostLogEntry { Message = "Test Message", Level = item, Context = "Test.Context" };
                var _controller = new LogController(new LoggerServiceCommand());

                // Act
                var _logResponse = _controller.WriteLog(_logEntry).GetAwaiter().GetResult();

                // Assert
                Assert.Equal(typeof(OkResult).ToString(), _logResponse.ToString());

            }
        }

        [Fact]
        public void WriteLog_Null_Entry()
        {
            var _controller = new LogController(new LoggerServiceCommand());

            // Arrange
            var _logEntry = new PostLogEntry { Message = "Test Message", Level = LogEntryLevel.Information, Context = null };

            // Act
            var _logResponse = _controller.WriteLog(_logEntry).GetAwaiter().GetResult();

            //Assert
            Assert.Equal(typeof(OkResult).ToString(), _logResponse.ToString());

        }
        #endregion Public Methods
    }
}