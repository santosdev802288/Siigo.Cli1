using Siigo.<%= config.nameCapitalize %>.Api.SeedWork;
using System.Collections.Generic;
using Xunit;

namespace Siigo.<%= config.nameCapitalize %>.Api.Test.SeedWork
{
    public class InvalidRequestExceptionTests
    {
        private readonly string message = "Message Invalid Request Exception";
        private readonly List<ErrorDetail> details = new List<ErrorDetail>()
        {
            new ErrorDetail()
            {
                Code = "Code",
                Message = "Message",
                Params = new List<string>()
                {
                    "Param1",
                    "Param2"
                },
                Detail = "Detail",
            }
        };

        [Fact]
        public void InvalidRequestException_WhenCalled_CreateNotNullObject()
        {
            var exception = new InvalidRequestException(message, details);
            //Assert
            Assert.Equal(message, exception.Message);
            Assert.Equal(details, exception.Details);
        }
    }
}
