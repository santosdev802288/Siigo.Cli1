using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public sealed class UnauthorizedException : ClientErrorException
    {
        private UnauthorizedException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        /// <summary>
        ///     Create 401 UnauthorizedException
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public UnauthorizedException(string code, string message, string details = null) : base(
            StatusCodes.Status401Unauthorized, message, details, code)
        {
        }
    }
}