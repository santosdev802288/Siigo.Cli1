using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
    public sealed class ForbiddenException : ClientErrorException
    {
        /// <summary>
        /// Create 403 ForbiddenException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public ForbiddenException(string details = null) : base(StatusCodes.Status403Forbidden, "Forbidden",
            details)
        {
        }
    }
}
