using System;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.AggregateModel.Contract
{
    public class ContractDebitTest
    {
        [Fact]
        public void ContractDebit_WhenCreateSingle_ReturnsSuccess()
        {
            //Arrange
            ContractDebitAmount contractDebitAmount = ContractDebitAmount.Instance(Single.Epsilon);
            ContractDebitStatus contractDebitStatusOpen = ContractDebitStatus.Instance(ContractDebitStatusItem.Open);
            ContractDebitStatus contractDebitStatusClose = ContractDebitStatus.Instance(ContractDebitStatusItem.Closed);
            ContractDebitStatus contractDebitStatusFinish = ContractDebitStatus.Instance(ContractDebitStatusItem.Finished);
            ContractDebitStatus contractDebitStatusNone = ContractDebitStatus.Instance(ContractDebitStatusItem.None);
           
            ContractDebit contractDebit = ContractDebit.Instance(contractDebitAmount, contractDebitStatusOpen);
            ContractDebit contractDebitFinish = ContractDebit.Instance(contractDebitAmount, contractDebitStatusFinish);
            ContractDebit contractDebitNone = ContractDebit.Instance(contractDebitAmount, contractDebitStatusNone);
            ContractDebit contractDebitClose = ContractDebit.Instance(contractDebitAmount, contractDebitStatusClose);
            ContractDebit contractDebitNull = ContractDebit.Instance(contractDebitAmount,null);


            //Act 
            contractDebit.SetAmount(Single.Epsilon);
            contractDebit.SetStatus(ContractDebitStatusItem.Closed, ContractDebitStatusItem.Open);

            //Asserts
            Assert.NotNull(contractDebit);
            Assert.NotNull(contractDebitFinish);
            Assert.NotNull(contractDebitNone);
            Assert.NotNull(contractDebitClose);
            Assert.NotNull(contractDebitNull);
            Assert.NotEmpty(contractDebit.Status.Value.ToString());
            Assert.True(contractDebit.Amount.Value > 0);
        }
    }
}