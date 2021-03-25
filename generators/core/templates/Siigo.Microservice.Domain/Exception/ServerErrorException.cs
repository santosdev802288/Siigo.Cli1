using Microsoft.AspNetCore.Http;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception
{
    public class ServerErrorException : System.Exception
    {
        public int StatusCode { get; }
        public string Code { get; }
        public string Details { get; }             
        
        /// <summary>
        /// Exception for 5XX Errors
        /// </summary>
        /// <param name="statusCode"></param>
        /// <param name="code"></param>
        /// <param name="message"></param>
        /// <param name="details"></param>
        
        public ServerErrorException(string code, string message, string details = null) : base(message)
        {
            StatusCode = StatusCodes.Status500InternalServerError;
            Code = code;            
            //Source = source;
            Details = details;
        }
    }
}