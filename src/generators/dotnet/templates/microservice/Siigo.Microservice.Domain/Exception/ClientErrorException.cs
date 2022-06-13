using System;
using System.Runtime.Serialization;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public abstract class ClientErrorException : System.Exception
    {
        protected ClientErrorException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
            Details = info.GetString("Details");
            StatusCode = info.GetInt32("StatusCode");
            Code = info.GetString("Code");
        }

        /// <summary>
        ///     Exception for 4XX Errors
        /// </summary>
        /// <param name="statusCode"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>
        protected ClientErrorException(int statusCode, string message, string details = null) : base(message)
        {
            StatusCode = statusCode;
            Details = details;
        }

        protected ClientErrorException(int status, string message, string details, string code) : base(message)
        {
            StatusCode = status;
            Details = details;
            Code = code;
        }

        public string Details { get; }

        public int StatusCode { get; }

        public string Code { get; }
    }
}

