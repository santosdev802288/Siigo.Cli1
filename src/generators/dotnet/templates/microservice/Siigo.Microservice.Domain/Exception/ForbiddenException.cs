using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public sealed class ForbiddenException : ClientErrorException
    {
        private ForbiddenException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        /// <summary>
        ///     Create 403 ForbiddenException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public ForbiddenException(string details = null) : base(StatusCodes.Status403Forbidden, "Forbidden",
            details)
        {
        }
    }    
}

