using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Models.Logger;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Controllers.v1
{
    /// <summary>
    /// Management API for logs
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]/[action]")]
    [Produces("application/json")]
    public class LogController : ControllerBase
    {
        #region Private Fields

        private readonly ILoggerServiceQuery _loggerServiceQuery;

        #endregion Private Fields

        #region Public Constructors

        public LogController(ILoggerServiceQuery loggerServiceQuery)
        {
            _loggerServiceQuery = loggerServiceQuery;
        }

        #endregion Public Constructors

        #region Public Methods
        
        /// <summary>
        /// Gets the levels you can use to write a log
        /// </summary>
        /// <returns>The log levels</returns>
        /// <response code="200">If the operation was successful</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public List<string> ReadLogEntryLevel()
        {
            return _loggerServiceQuery.ReadLogEntryLevel();
        }

        #endregion Public Methods
    }
}