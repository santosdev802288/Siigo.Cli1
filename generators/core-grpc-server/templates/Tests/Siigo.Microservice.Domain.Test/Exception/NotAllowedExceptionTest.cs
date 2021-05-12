using Microsoft.AspNetCore.Http;
using Siigo.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace Siigo.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class NotAllowedExceptionTest
    {
        private readonly string details = "Not Awllowed Exception Detail";
        
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new NotAllowedException(details);
            //Asserts
            Assert.Equal(details, exception.Details);
            Assert.Equal(StatusCodes.Status405MethodNotAllowed, exception.StatusCode);
            Assert.Equal("Method Not Allowed", exception.Message);
            
        }
    }
}
