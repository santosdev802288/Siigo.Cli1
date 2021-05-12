using Microsoft.AspNetCore.Http;
using Siigo.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace Siigo.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class NotAcceptableExceptionTest
    {
        private readonly string details = "Not Acceptable Exception Detail";
        
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new NotAcceptableException(details);
            //Asserts
            Assert.Equal(details, exception.Details);
            Assert.Equal(StatusCodes.Status406NotAcceptable, exception.StatusCode);
            Assert.Equal("Not Acceptable", exception.Message);
            
        }
    }
}
