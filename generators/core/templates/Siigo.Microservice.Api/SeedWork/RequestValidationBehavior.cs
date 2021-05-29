using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

namespace  <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork
{
    public class RequestValidationBehavior<TRequest, TResponse> :
        IPipelineBehavior<TRequest, TResponse>  where TRequest : IRequest<TResponse> 
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public RequestValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        /// <summary>
        /// Handle to validate request input and check errors
        /// </summary>
        /// <param name="request"> Request to validate</param>
        /// <param name="cancellationToken">MediatR Cancelation Token</param>
        /// <param name="next">Delegate response</param>
        public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            var errors = _validators
                .Select(v => v.Validate(request))
                .SelectMany(result => result.Errors)
                .Where(f => f != null)
                .ToList();

            if (errors.Any())
            {
                var errorDetails = new List<ErrorDetail>();
                foreach (var error in errors)
                {
                    var errorDetail = new ErrorDetail();
                    errorDetail.Code = error.ErrorCode;
                    errorDetail.Params.Add(error.PropertyName);
                    if (error.ErrorMessage.Contains("|"))
                    {
                        var messages = error.ErrorMessage.Split("|");
                        errorDetail.Message = messages[0];
                        errorDetail.Params.AddRange(messages.Skip(1).ToList());
                    }
                    else
                    {
                        errorDetail.Message = error.ErrorMessage;
                    }

                    errorDetails.Add(errorDetail);
                }
                // Throw exception with all errors
                throw new InvalidRequestException(null, errorDetails);
            }

            return next();
        }
    }
}
