using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure.Extensions;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions
{
    [ExcludeFromCodeCoverage]
    public class ExceptionMiddleware
    {
        #region Private Fields

        private readonly SiigoLogger _logger = new(typeof(ExceptionMiddleware));

        private readonly RequestDelegate _next;

        #endregion Private Fields

        #region Public Constructors

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        #endregion Public Constructors

        #region Public Methods

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        #endregion Public Methods

        #region Private Methods

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            var errorDetails = GetErrorDetails(exception);
            context.Response.StatusCode = errorDetails.Status;

            SetDetailToLogContext(context, exception, errorDetails);

            return context.Response.WriteAsync(errorDetails.ToString());
        }

        private void SetDetailToLogContext(HttpContext httpContext, Exception ex, ErrorResponse errorDetails)
        {
            switch (httpContext.Response.StatusCode)
            {
                case StatusCodes.Status400BadRequest:
                case StatusCodes.Status401Unauthorized:
                case StatusCodes.Status402PaymentRequired:
                case StatusCodes.Status403Forbidden:
                case StatusCodes.Status404NotFound:
                case StatusCodes.Status405MethodNotAllowed:
                case StatusCodes.Status409Conflict:
                    var messages = errorDetails.Errors?.FirstOrDefault()?.Message;
                    var details = errorDetails.Errors?.FirstOrDefault()?.Detail;
                    var codes = errorDetails.Errors?.FirstOrDefault()?.Code;

                    if (errorDetails.Errors?.Count > 1)
                    {
                        messages = string.Join('|', errorDetails.Errors.Select(error => error.Message));
                        details = string.Join('|', errorDetails.Errors.Select(error => error.Detail));
                        codes = string.Join('|', errorDetails.Errors.Select(error => error.Code));
                    }

                    if (!string.IsNullOrEmpty(messages)) _logger.SetPropertyToContext("Messages", $"{messages}");
                    if (!string.IsNullOrEmpty(details)) _logger.SetPropertyToContext("Details", $"{details}");
                    if (!string.IsNullOrEmpty(codes)) _logger.SetPropertyToContext("Codes", $"{codes}");

                    if (!ex.Message.Equals(messages, StringComparison.Ordinal))
                        _logger.SetPropertyToContext("ExceptionMessages", $"{ex.Message}");
                    break;
                default:
                    var innerExceptionMessages = ex.GetAllMessages();
                    _logger.SetPropertyToContext("ExceptionMessages", $"{innerExceptionMessages}");
                    _logger.SetPropertyToContext("ExceptionStackTrace", $"{ex.StackTrace}");
                    break;
            }
        }

        /// <summary>
        /// Mapping Exceptions to ErrorDetails viewModel output 
        /// </summary>
        /// <param name="contextFeature"></param>
        /// <returns></returns>
        private static ErrorResponse GetErrorDetails(Exception contextFeature)
        {
            // Controlled Exceptions 
            return contextFeature switch
            {
                // Any Fluent Rules Business Validations 
                ClientErrorException clientErrorException => new ErrorResponse
                {
                    Status = clientErrorException.StatusCode,
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Code = clientErrorException.Code,
                            Message = clientErrorException.Message,
                            Detail = clientErrorException.Details
                        }
                    }
                },
                ArgumentNullException argumentNullException => new ErrorResponse
                {
                    Status = StatusCodes.Status404NotFound,
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Message = "NotFound Null Resource Validation",
                            Detail = argumentNullException.Message
                        }
                    }
                },
                // Fluent Validators in IRequest Instances 
                InvalidRequestException invalidRequestException => new ErrorResponse
                {
                    Status = StatusCodes.Status400BadRequest,
                    Errors = invalidRequestException.Details
                },
                // Guard Validations
                ArgumentException argumentException => new ErrorResponse
                {
                    Status = StatusCodes.Status409Conflict,
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Message = "Argument Exception (Guard)",
                            Detail = argumentException.Message
                        }
                    }
                },
                // Any Fluent Rules Business Validations 
                ValidationException validationException => new ErrorResponse
                {
                    Status = StatusCodes.Status409Conflict,
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Code = GetErrorsCode(validationException.Message),
                            Message = "Conflict Business Validation",
                            Detail = validationException.Message
                        }
                    }
                },
                // Controlled server exception
                ServerErrorException serverErrorException => new ErrorResponse
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Code = serverErrorException.Code,
                            Message = serverErrorException.Message,
                            Detail = serverErrorException.Details
                        }
                    }
                },
                // Exception Not Controlled => Internal Server Error
                _ => new ErrorResponse
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Message = "Internal Server Error",
                            Detail = contextFeature.Message
                        }
                    }
                },
            };
        }

        private static String GetErrorsCode(string message)
        {
            StringBuilder codes = new StringBuilder();
            string[] errors = message.Split("\r\n -- ");
            foreach (string error in errors)
            {
                string errorCode = error.Split(":")[0];
                if (!string.IsNullOrEmpty(errorCode) && !errorCode.Equals("Validation failed"))
                    codes.Append(errorCode + ",");
            }

            return codes.ToString().Substring(0, codes.Length - 1);
        }

        #endregion Private Methods
    }
}
