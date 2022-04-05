using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using Xunit;
using System.Collections.Generic;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Test.SeedWork
{
    public class ErrorDetailsTest
    {
       private readonly int _status = 404;
        private readonly List<ErrorDetail> _errors = new List<ErrorDetail>()
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
        public void ErrorDetails_WhenCalled_CreateNotNullObject()
        {
            var errorDetails = new ErrorResponse();

            errorDetails.Status = _status;
            errorDetails.Errors = _errors;
            //Asserts
            Assert.Equal(_status, errorDetails.Status);
            Assert.Equal(_errors, errorDetails.Errors);
            Assert.Contains("{", errorDetails.ToString());
        }
    }
}
