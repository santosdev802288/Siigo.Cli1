using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public sealed class BusinessException : ClientErrorException
    {
        private BusinessException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public BusinessException(
            string code, string message, string details = null
        ) : base(StatusCodes.Status409Conflict, message, details, code)
        {
        }
    }
}

