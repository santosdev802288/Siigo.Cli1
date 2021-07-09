using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
    public sealed class NotFoundException : ClientErrorException
    {
        
        /// <summary>
        /// Create 404 NotFoundException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public NotFoundException(string details = null) : base(StatusCodes.Status404NotFound, "Resource Not Found",
            details)
        {
        }

        /// <summary>
        /// Create 404 NotFoundException
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>        
        public NotFoundException(string code, string message, string details = null) : base(StatusCodes.Status404NotFound, message, details, code)
        {
        }
    }
}
