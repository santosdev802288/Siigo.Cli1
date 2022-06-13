using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public sealed class NotAllowedException : ClientErrorException
    {
        private NotAllowedException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        /// <summary>
        ///     Create 405 NotAllowedException
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

