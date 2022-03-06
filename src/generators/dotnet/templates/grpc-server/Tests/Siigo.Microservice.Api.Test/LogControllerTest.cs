using Microsoft.AspNetCore.Mvc;
using Moq;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Models.Logger;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service;
using System;

using Xunit;

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
            var _controller = new LogController(new LoggerService());

            foreach (LogEntryLevel item in Enum.GetValues(typeof(LogEntryLevel)))
            {
                // Arrange
                var _logEntry = new PostLogEntry { Message = "Test Message", Level = item, Context = "Test.Context" };

                // Act
                var _logResponse = _controller.WriteLog(_logEntry).GetAwaiter().GetResult();

                //Assert
                Assert.Equal(typeof(OkResult).ToString(), _logResponse.ToString());
            }
        }

        [Fact]
        public void WriteLog_Null_Entry()
        {
            var _controller = new LogController(new LoggerService());

            // Arrange
            var _logEntry = new PostLogEntry { Message = "Test Message", Level = LogEntryLevel.Information, Context = null };

            // Act
            var _logResponse = _controller.WriteLog(_logEntry).GetAwaiter().GetResult();

            //Assert
            Assert.Equal(typeof(OkResult).ToString(), _logResponse.ToString());

        }

        #endregion Public Methods

        #region Private Methods

        private static ILoggerService GetLogServiceMoq()
        {
            var _mock = new Mock<ILoggerService>();

            _mock.Setup(m => m.WriteLog(It.IsAny<PostLogEntry>())).Returns((LogEntry entry) => new Action(() =>
                _logEntryResult = entry
            ));

            return _mock.Object;
        }

        #endregion Private Methods
    }
}