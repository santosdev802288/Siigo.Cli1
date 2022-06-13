using System;
using Dawn;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject
{
public enum ContractDebitStatusItem
{
    None = 0,
    Open = 1,
    Closed = 2,
    Finished = 3
}

public class ContractDebitStatus
{
    private ContractDebitStatus(ContractDebitStatusItem status)
    {
        Value = Guard.Argument(status, nameof(status)).In(
            ContractDebitStatusItem.None,
            ContractDebitStatusItem.Open,
            ContractDebitStatusItem.Closed,
            ContractDebitStatusItem.Finished
        );
    }

    public ContractDebitStatusItem Value { get; protected set; }


    /// <summary>
    ///     Create singleton instance
    /// </summary>
    /// <param name="value">current status to assign </param>
    /// <param name="prevValue">prev status assigned</param>
    /// <returns></returns>
    /// <exception cref="ArgumentOutOfRangeException">When prevValue is out of range</exception>
    public static ContractDebitStatus Instance(ContractDebitStatusItem value,
        ContractDebitStatusItem? prevValue = ContractDebitStatusItem.None)
    {
        if (prevValue == ContractDebitStatusItem.None)
            return new ContractDebitStatus(value);

        // validate debit status flow correctly
        // flow: None -> Open -> Closed -> Finished 
        var status = prevValue switch
        {
            ContractDebitStatusItem.None =>
                Guard.Argument(value, "Status").Equal(ContractDebitStatusItem.Open),
            ContractDebitStatusItem.Open =>
                Guard.Argument(value, "Status").Equal(ContractDebitStatusItem.Closed),
            ContractDebitStatusItem.Closed =>
                Guard.Argument(value, "Status").Equal(ContractDebitStatusItem.Finished),
            ContractDebitStatusItem.Finished =>
                Guard.Argument(value, "Status").Equal(ContractDebitStatusItem.Finished),
            _ => throw new ArgumentOutOfRangeException(nameof(value), value, null)
        };

        return new ContractDebitStatus(status);
    }
}    
}

