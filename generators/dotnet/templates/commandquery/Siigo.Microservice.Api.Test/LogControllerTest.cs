using Moq;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;
using Siigo.LogTest.Api.Models.Logger;
using System;

using Xunit;
using System.Collections.Generic;

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
            // Arrange
            _logEntryResult = null;
            var _logEntry = new PostLogEntry { Message = "Test Message", Level = LogEntryLevel.Information, Context = "Test.Context" };
            var _controller = new LogController(GetLogServiceMoq(), GetEmunServiceLogs());

            // Act
            _controller.WriteLog(_logEntry).Wait();

            // Assert
            Assert.Equal(_logEntry, _logEntryResult);
        }


        [Fact]
        public void ListEmun_Success()
        {
            // Arrange
            var _listEmun = new List<string>() { "Trace", "Debug", "Information", "Warning", "Error", "Critial" };
            var _controller = new LogController(GetLogServiceMoq(), GetEmunServiceLogs());

            // Act
            var _listResult = _controller.ReadLogEntryLevel();

            // Assert
            Assert.Equal(_listEmun, _listResult);
        }
        #endregion Public Methods

        #region Private Methods

        private static ILoggerServiceCommand GetLogServiceMoq()
        {
            var _mock = new Mock<ILoggerServiceCommand>();

            _mock.Setup(m => m.WriteLog(It.IsAny<PostLogEntry>())).Returns((LogEntry entry) => new Action(() =>
                _logEntryResult = entry
            ));

            return _mock.Object;
        }

        private static ILoggerServiceQuery GetEmunServiceLogs()
        {
            var _mock = new Mock<ILoggerServiceQuery>();

            _mock.Setup(m => m.ReadLogEntryLevel()).Returns(new List<string>() { "Trace", "Debug", "Information", "Warning", "Error", "Critial" } );

            return _mock.Object;
        }

        #endregion Private Methods
    }
}