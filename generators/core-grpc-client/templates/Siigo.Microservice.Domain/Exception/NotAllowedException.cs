using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
    public sealed class NotAllowedException : ClientErrorException
    {
        
        /// <summary>
        /// Create 405 NotAllowedException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public NotAllowedException(string details = null) : base(StatusCodes.Status405MethodNotAllowed,
            "Method Not Allowed",
            details)
        {
        }
    }
}
