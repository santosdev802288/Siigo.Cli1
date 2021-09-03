using FluentValidation;
using MediatR;

namespace <%= config.name %>.Application.Commands
{
    /// <summary>
    /// A command has all the data needed to service a request
    /// </summary>
    public class OrderCommand
        : IRequest<int>
    {
        public int OrderId { get; set; }

        protected OrderCommand()
        {
        }

        public OrderCommand(int id)
        {
            OrderId = id;
        }


        public class OrderCommandValidator : AbstractValidator<OrderCommand>
        {
            public OrderCommandValidator()
            {
                RuleFor(m => m.OrderId).GreaterThan(0)
                    .WithMessage("OrderId  must be greater than 0}");
            }
        }
    }
}
