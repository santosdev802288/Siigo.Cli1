using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Models.Logger;
using Siigo.LogTest.Api.Models.Logger;
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

        private readonly ILoggerService _loggerService;

        #endregion Private Fields

        #region Public Constructors

        public LogController(ILoggerService logService)
        {
            _loggerService = logService;
        }

        #endregion Public Constructors

        #region Public Methods

        /// <summary>
        /// Generates a log entry
        /// </summary>
        /// <param name="entry">The log's entry object</param>
        /// <returns>The log entry</returns>
        /// <response code="200">If the operation was successful</response>
        /// <response code="404">If the value was not found</response>
        /// <response code="400">If the value is null or empty</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<IActionResult> WriteLog(PostLogEntry entry)
        {
            _ = Task.Run(_loggerService.WriteLog(entry));
            return await Task.Run(Ok);
        }

        #endregion Public Methods
    }
}