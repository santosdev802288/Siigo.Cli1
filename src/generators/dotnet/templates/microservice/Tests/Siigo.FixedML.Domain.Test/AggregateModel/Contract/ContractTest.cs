using System;
using Google.Protobuf.WellKnownTypes;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Aggregates.Contract.Events;
using Xunit;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Test.AggregateModel.Contract;

public class ContractTest
{
    private readonly bool _activated = true;
    private readonly string _address = "Address Example";

    private readonly int _cost = 0;
    private readonly string _email = "Email Example";
    private readonly string _email_updated = "Email Updated";
    private readonly Timestamp _ocurreAt = Timestamp.FromDateTime(DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc));
    
    [Fact]
    public void should_create_object_when_instance_success()
    {
        var model = new Aggregates.Contract.Contract();
        model.Cost = _cost;
        model.Activated = _activated;
        model.Address = _address;
        model.Email = _email;
        model.OccurredAt = _ocurreAt;
        //Asserts
        Assert.Equal(_cost, model.Cost);
        Assert.Equal(_activated, model.Activated);
        Assert.Equal(_address, model.Address);
        Assert.Equal(_email, model.Email);
        Assert.Equal(_ocurreAt, model.OccurredAt);
    }

    [Fact]
    public void should_update_email_when_call_update_success()
    {
        var model = new Aggregates.Contract.Contract();
        var id = Guid.NewGuid();
        model.Email = _email;
        model.ChangeEmail(_email_updated);
        model.SetId(id);
        //Asserts
        Assert.Equal(_email_updated, model.Email);
        Assert.Equal(id, model.Id);
    }

    [Fact]
    public void should_update_event_when_call_instance_success()
    {
        var id = Guid.NewGuid();
        var eventTo = new ContractEmailUpdatedDomainEvent(id.ToString(), _email);
        //Asserts
        Assert.Equal(_email, eventTo.Email);
        Assert.Equal(id.ToString(), eventTo.Id);
    }
}