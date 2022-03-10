using Siigo.Core.<%= config.nameCapitalize %>;
using Xunit;

namespace Siigo.Core.<%= config.nameCapitalize %>.Test
{
    public class My<%= config.nameCapitalize %>Test
    {
        [Fact]
        public void AboutTest()
        {
            //arrange

            //act
            string message = My<%= config.nameCapitalize %>.About();

            //assert
            Assert.Equal("Siigo library", message);
        }
    } 
}
