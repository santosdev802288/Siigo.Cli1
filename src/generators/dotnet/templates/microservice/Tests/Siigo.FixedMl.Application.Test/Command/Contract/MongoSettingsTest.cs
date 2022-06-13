using System.Threading.Tasks;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Options;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Application.Test.Command.Contract
{
    public class MongoSettingsTest
    {
        [Theory]
        [InlineData(
            "mongodb+srv://siigo-catalog-qa-dbProduct:ZS8BfbGpqa7PCvsp@siigo-catalog-qa.u7fhi.azure.mongodb.net/dbProduct?retryWrites=true&w=majority3")]
        [InlineData("mongodb+srv://localhost/dbProduct?retryWrites=true&w=majority")]
        public Task GetConnectionString_WhenCreateEntity_ContainData(string contractIdExpected)
        {
            // Act
            var mongoSettings = new MongoOptions();
            mongoSettings.ConnectionString = contractIdExpected;
            // Assert
            Assert.NotNull(mongoSettings);
            Assert.True(mongoSettings.ConnectionString.Length > 0);
            return Task.CompletedTask;
        }

        [Theory]
        [InlineData("DBProduct")]
        [InlineData("DBContract")]
        public Task GetDataBaseName_WhenCreateEntity_ContainData(string contractIdExpected)
        {
            // Act
            var mongoSettings = new MongoOptions();
            mongoSettings.DatabaseName = contractIdExpected;
            // Assert
            Assert.NotNull(mongoSettings);
            Assert.True(mongoSettings.DatabaseName.Length > 0);
            return Task.CompletedTask;
        }


        [Theory]
        [InlineData("contract")]
        [InlineData("contractsubdomain")]
        public Task GetCollection_WhenCreateEntity_ContainData(string contractIdExpected)
        {
            //Arrange 
            var collections = new Collections();
            collections.Contract = contractIdExpected;

            // Act
            var mongoSettings = new MongoOptions();
            mongoSettings.Collections = collections;
            // Assert
            Assert.NotNull(mongoSettings);
            Assert.NotNull(mongoSettings.Collections);
            Assert.True(mongoSettings.Collections.Contract != null && mongoSettings.Collections.Contract.Length > 0);
            return Task.CompletedTask;
        }
    }
}