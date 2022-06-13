using Microsoft.AspNetCore.Http;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class ConflictExceptionTest
    {
        private readonly string _details = "ConflictException Detail";
        private readonly string _code = "Service Code Exception ";
        private readonly string _message = "Service Message Exception ";
        
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new ConflictException(_details);
            //Asserts
            Assert.Equal(_details, exception.Details);
            Assert.Equal(StatusCodes.Status409Conflict, exception.StatusCode);
            Assert.Equal("Conflict", exception.Message);
            
        }
        
        [Fact]
        public void Success_Model_When_Call_Another_Construct()
        {
            var exception = new ConflictException(_code,_message,_details);
            //Asserts
            Assert.Equal(_code, exception.Code);
            Assert.Equal(_message, exception.Message);
            Assert.Equal(_details, exception.Details);
            
        }
    }
}
