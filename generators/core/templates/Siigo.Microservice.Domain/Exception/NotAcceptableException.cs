using System;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Http;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
public sealed class NotAcceptableException : ClientErrorException
{

    /// <summary>
    /// Create 406 NotAcceptableException
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
