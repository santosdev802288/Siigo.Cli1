using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Extensions;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Test.Extensions
{
    public class ClassExtensionsTest
    {
        private readonly Object _nullVar = null;
        private readonly int _zero = 0;
        
        public ClassExtensionsTest()
        {
        }
        
        [Fact]
        public void CheckIsNullMethod()
        {
            Assert.Null(_nullVar);
            Assert.True(_nullVar.IsNull());
            Assert.False(_nullVar.IsNotNull());
        }
          
        [Fact]
        public void CheckThrowNotFoundIfNull()
        {
            Exception ex = Assert.Throws<NotFoundException>(() => _nullVar.ThrowNotFoundIfNull("Message Test"));
            Assert.Equal("Resource Not Found", ex.Message);
        }

        [Fact]
        public void CheckThrowNotFoundIfNotNull()
        {
            var result = new Guid();
            var expected = result.ThrowNotFoundIfNull("Message Test");
            Assert.NotNull(expected);
        }
        
        [Fact]
        public void CheckThrowNotFoundIfZero()
        {
            Exception ex = Assert.Throws<NotFoundException>(() => _zero.ThrowNotFoundIfZero("Message Text"));
            Assert.Equal("Resource Not Found", ex.Message);
        }

        [Fact]
        public void CheckThrowNotFoundIfNotZero()
        {
            var result = 1;
            var expected = result.ThrowNotFoundIfZero("Message Test");
            Assert.Equal(1,expected);
        }
    }
}
