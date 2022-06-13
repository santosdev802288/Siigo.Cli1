using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace Siigo.FixedML.Domain.Exception
{
[Serializable]
public class ServerErrorException : System.Exception
{
    /// <summary>
    ///     Exception for 5XX Errors
    /// </summary>
    /// <param name="statusCode"></param>
    /// <param name="code"></param>
    /// <param name="message"></param>
    /// <param name="details"></param>
    public ServerErrorException(string code, string message, string details = null) : base(message)
    {
        StatusCode = StatusCodes.Status500InternalServerError;
        Code = code;

        Details = details;
    }

    protected ServerErrorException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
        Details = info.GetString("Details");
        StatusCode = info.GetInt32("StatusCode");
        Code = info.GetString("Code");
    }

    public int StatusCode { get; }
    public string Code { get; }
    public string Details { get; }
}    
}

