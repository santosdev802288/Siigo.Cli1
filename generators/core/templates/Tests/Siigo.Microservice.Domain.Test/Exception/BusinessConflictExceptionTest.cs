using Microsoft.AspNetCore.Http;
using Siigo.<%= config.nameCapitalize %>.Domain.Exception;
using Xunit;

namespace Siigo.<%= config.nameCapitalize %>.Domain.Test.Exception
{
    public class BusinessConflictExceptionTest
    {
        [Fact]
        public void CreateExceptionTest()
        {
            var exception = new BusinessException("code", "message");
            Assert.Equal(StatusCodes.Status409Conflict, exception.StatusCode);

        }
    }
}