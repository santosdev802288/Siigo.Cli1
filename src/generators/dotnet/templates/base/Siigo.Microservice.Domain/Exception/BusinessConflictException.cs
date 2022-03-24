using System;
using Microsoft.AspNetCore.Http;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception
{
    [Serializable]
    public sealed class BusinessException : ClientErrorException
    {
        public BusinessException(
            string code, string message, string details = null
        ) : base(StatusCodes.Status409Conflict, message, details, code)
        {
        }
    }
}