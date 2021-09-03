using MediatR;
using <%= config.name %>.Application.Model;

namespace <%= config.name %>.Application.Queries
{
    /// <summary>
    /// We handle the query objects like the command and command handlers
    /// The Query DTO includes all the data needed to handle the request
    /// </summary>
    public class OrderQuery : IRequest<IContract> // replace object with your class
    {
        public int Id { get; }

        public OrderQuery(int id)
        {
            Id = id;
        }
    }
}
