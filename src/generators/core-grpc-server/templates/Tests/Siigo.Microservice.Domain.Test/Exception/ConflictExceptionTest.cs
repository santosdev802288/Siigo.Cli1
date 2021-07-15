using Microsoft.AspNetCore.Http;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class ConflictExceptionTest
    {
        private readonly string details = "ConflictException Detail";
        
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new ConflictException(details);
            //Asserts
            Assert.Equal(details, exception.Details);
            Assert.Equal(StatusCodes.Status409Conflict, exception.StatusCode);
            Assert.Equal("Conflict", exception.Message);
            
        }
    }
}
