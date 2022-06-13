using System;
using System.Linq;
using Google.Protobuf.WellKnownTypes;
using Siigo.Core.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Rules;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.ValueObject;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.SeedWork;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract
{
/// <summary>
///     Aggregate root for this domain
/// </summary>
public class Contract : Entity<Guid>
{
    public Contract()
    {
    }

    public Contract(Guid id)
    {
        Id = id;
    }


    public sealed override Guid Id { get; protected set; }


    public int Cost { get; set; }


    public bool Activated { get; set; }

    public ContractDebit Debit { get; set; }

    public string Address { get; set; }
    public string Email { get; set; }

    public Timestamp OccurredAt { get; set; }

    public void SetId(Guid id)
    {
        Id = id;
    }

    /// <summary>
    ///     Change email for <see cref="Contract" />
    /// </summary>
    /// <param name="email"></param>
    public void ChangeEmail(string email)
    {
        Email = email;


        AddDomainEvent(new ContractEmailUpdatedDomainEvent(Id.ToString(), email));
    }

    /// <summary>
    ///     Update state for <see cref="Contract" />
    /// </summary>
    /// <param name="status">current status to assign </param>
    /// <param name="prevStatus">prev status assigned</param>
    public void ChangeDebitStatus(ContractDebitStatusItem status,
        ContractDebitStatusItem prevStatus = ContractDebitStatusItem.None)
    {
        CheckRules(ContractDebitStatusCanBeUpdateRule.Instance(status, Debit.Amount.Value));

        Debit.SetStatus(status, prevStatus);

        AddDomainEvent(
            ContractStatusUpdatedDomainEvent.Instance(Id.ToString(), status.ToString(), prevStatus.ToString())
        );
    }

    /// <summary>
    ///     Update debit amount for contract
    /// </summary>
    /// <param name="amount">new amount value</param>
    public void ChangeDebitAmount(float amount)
    {
        CheckRules(ContractDebitAmountUpdateRule.Instance(Debit.Status.Value));
        Debit.SetAmount(amount);

        AddDomainEvent(
            ContractAmountUpdatedDomainEvent.Instance(Id.ToString(), amount)
        );
    }

    /// <summary>
    ///     Create instance singleton
    /// </summary>
    /// <returns></returns>
    public static Contract Instance()
    {
        // new contract aggregate
        var contract = new Contract();

        // generate unique identifier
        contract.SetId(Guid.NewGuid());

        // Add domain event
        contract.AddDomainEvent(new ContractCreatedDomainEvent(contract.Id.ToString()));

        return contract;
    }


    /// <summary>
    ///     Valid rules for aggregate domain
    /// </summary>
    /// <param name="rules">List of rules to valid</param>
    /// <exception cref="DomainRuleValidationException"></exception>
    protected static void CheckRules(params IDomainRules[] rules)
    {
        rules.ToList().ForEach(rule =>
        {
            if (rule.IsBroken()) throw new DomainRuleValidationException(rule);
        });
    }
}    
}

