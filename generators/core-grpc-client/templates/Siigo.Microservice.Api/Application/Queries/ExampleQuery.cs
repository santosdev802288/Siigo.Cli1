using MediatR;
using Siigo.<%= config.nameCapitalize %>.Api.Application.Model;

namespace Siigo.<%= config.nameCapitalize %>.Api.Application.Queries
{
    /// <summary>
    /// We handle the query objects like the command and command handlers
    /// The Query DTO includes all the data needed to handle the request
    /// </summary>
    public class ExampleQuery : IRequest<string> // replace object with your class
    {
        public int Id { get; }

        public ExampleQuery(int id)
        {
            Id = id;
        }
    }
}
