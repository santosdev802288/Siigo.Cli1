using Moq;

using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Service;
using System;

using Xunit;
using System.Collections.Generic;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Test
{
    public class LogControllerTest
    {
        #region Private Fields

        #endregion Private Fields

        #region Public Methods

       [Fact]
        public void ListEmun_Success()
        {
            // Arrange
            var _listEmun = new List<string>() { "Trace", "Debug", "Information", "Warning", "Error", "Critial" };
            var _controller = new LogController(new LoggerServiceQuery());

            // Act
            var _listResult = _controller.ReadLogEntryLevel();

            // Assert
            Assert.Equal(_listEmun, _listResult);
        }

        #endregion Public Methods
    }
}