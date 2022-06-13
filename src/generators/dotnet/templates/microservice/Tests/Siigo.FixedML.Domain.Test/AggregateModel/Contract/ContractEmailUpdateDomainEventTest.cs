using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.AggregateModel.Contract
{
    public class ContractEmailUpdateDomainEventTest
    {
        [Fact]
        public void ContractEmailUpdateDomainEvent_WhenCreateSingle_ReturnsSuccess()
        {
            //Arrange
            var id = Guid.NewGuid();
            var email = "email@email.com";

            //Act 
            var model = new ContractEmailUpdatedDomainEvent(id.ToString(), email);

            //Asserts
            Assert.NotEmpty(model.EventType);
            Assert.NotEmpty(model.Id);
            Assert.NotEmpty(model.Email);
        }
    }
}