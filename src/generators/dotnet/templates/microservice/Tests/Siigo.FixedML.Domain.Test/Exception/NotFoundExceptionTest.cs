using Microsoft.AspNetCore.Http;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class NotFoundExceptionTest
    {
        private readonly string _details = "Not Found Exception Detail";
        private readonly string _code = "Service Code Exception ";
        private readonly string _message = "Service Message Exception ";
        
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new NotFoundException(_details);
            //Asserts
            Assert.Equal(_details, exception.Details);
            Assert.Equal(StatusCodes.Status404NotFound, exception.StatusCode);
            Assert.Equal("Resource Not Found", exception.Message);
            
        }
        
        [Fact]
        public void Success_Model_When_Call_Another_Construct()
        {
            var exception = new NotFoundException(_code,_message,_details);
            //Asserts
            Assert.Equal(_code, exception.Code);
            Assert.Equal(_message, exception.Message);
            Assert.Equal(_details, exception.Details);
            
        }
    }
}
