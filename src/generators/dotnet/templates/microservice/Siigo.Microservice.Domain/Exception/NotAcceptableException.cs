using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public sealed class NotAcceptableException : ClientErrorException
    {
        private NotAcceptableException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        /// <summary>
        ///     Create 406 NotAcceptableException
        /// </summary>
        /// <param name="message"></param>
        /// <param name="details"></param>
        public NotAcceptableException(string details = null) : base(StatusCodes.Status406NotAcceptable,
            "Not Acceptable",
            details)
        {
        }
    }    
}

