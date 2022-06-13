using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.AggregateModel.Contract
{
    public class ContractCreatedDomainEventTest
    {
        [Fact]
        public void ContractCreatedDomainEvent_WhenSCreateSingle_ReturnsSuccess()
        {
            //Arrange
            var id = Guid.NewGuid();
            
            //Act 
            var model = new ContractCreatedDomainEvent(id.ToString());
            
            //Asserts
            Assert.Equal(id.ToString(), model.Id);
            Assert.NotEmpty(model.EventType);
        }
    }
}