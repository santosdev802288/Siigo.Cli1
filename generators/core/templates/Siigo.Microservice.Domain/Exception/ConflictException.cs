using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
    public sealed class ConflictException : ClientErrorException
    {
        /// <summary>
        /// Create 409 ConflictException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public ConflictException(string details = null) : base(StatusCodes.Status409Conflict, "Conflict",
            details)
        {
        }

        /// <summary>
        /// Create 409 ConflictException
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>        
        public ConflictException(string code, string message, string details = null) : base(StatusCodes.Status409Conflict, message, details, code)
        {
        }
    }
}
