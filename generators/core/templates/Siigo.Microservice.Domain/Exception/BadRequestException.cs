using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
    public sealed class BadRequestException : ClientErrorException
    {
        /// <summary>
        /// Create 400 BadRequestException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public BadRequestException(string details = null) : base(StatusCodes.Status400BadRequest, "Bad Request",
            details)
        {
        }

        /// <summary>
        /// Create 400 BadRequestException
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>       
        public BadRequestException(string code, string message, string details = null) : base(StatusCodes.Status400BadRequest, message, details, code)
        {
        }
    }
}