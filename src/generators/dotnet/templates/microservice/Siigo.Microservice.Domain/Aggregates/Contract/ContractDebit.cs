using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract;

public record ContractDebit
{
    private ContractDebit(ContractDebitAmount amount, ContractDebitStatus status)
    {
        Status = status;
        Amount = amount;
    }

    /// <summary>
    ///     The amount value for <see cref="ContractDebit" /> on <see cref="Contract" />
    /// </summary>
    public ContractDebitAmount Amount { get; protected set; } = ContractDebitAmount.Instance(0);


    /// <summary>
    ///     The status value for <see cref="ContractDebit" /> on <see cref="Contract" />
    /// </summary>
    public ContractDebitStatus Status { get; protected set; } =
        ContractDebitStatus.Instance(ContractDebitStatusItem.None);

    /// <summary>
    ///     Create singleton instance
    /// </summary>
    /// <param name="amount"></param>
    /// <param name="status"></param>
    /// <returns></returns>
    public static ContractDebit Instance(ContractDebitAmount amount, ContractDebitStatus status)
    {
        return new ContractDebit(amount, status);
    }

    public void SetStatus(ContractDebitStatusItem status,
        ContractDebitStatusItem prevStatus)
    {
        Status = ContractDebitStatus.Instance(status, prevStatus);
    }

    public void SetAmount(float amount)
    {
        Amount = ContractDebitAmount.Instance(amount);
    }
}