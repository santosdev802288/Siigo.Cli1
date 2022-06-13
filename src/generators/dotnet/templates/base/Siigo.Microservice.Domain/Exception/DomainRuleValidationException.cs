using System;
using System.Runtime.Serialization;
using Siigo.FixedML.Domain.SeedWork;

namespace Siigo.FixedML.Domain.Exception
{
    [Serializable]
    public class DomainRuleValidationException : System.Exception
    {
        protected DomainRuleValidationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public DomainRuleValidationException(IDomainRules brokenRule) : base(brokenRule.Message)
        {
            BrokenRule = brokenRule;
            Details = brokenRule.Message;
        }

        public IDomainRules BrokenRule { get; }

        public string Details { get; }

        public override string ToString()
        {
            return $"{BrokenRule.GetType().FullName}: {BrokenRule.Message}";
        }
    }    
}

