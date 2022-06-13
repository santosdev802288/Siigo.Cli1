using Microsoft.AspNetCore.Http;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class TimeoutExceptionTest
    {
        private readonly string _details = "Timeout Exception Detail";
        private readonly string _code = "Service Code Exception ";
        private readonly string _message = "Service Message Exception ";
        
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new TimeoutException(_details);
            //Asserts
            Assert.Equal(_details, exception.Details);
            Assert.Equal(StatusCodes.Status408RequestTimeout, exception.StatusCode);
            Assert.Equal("Request Timeout", exception.Message);
            
        }
        
        [Fact]
        public void Success_Model_When_Call_Another_Construct()
        {
            var exception = new TimeoutException(_code,_message,_details);
            //Asserts
            Assert.Equal(_code, exception.Code);
            Assert.Equal(_message, exception.Message);
            Assert.Equal(_details, exception.Details);
            
        }
    }
}
