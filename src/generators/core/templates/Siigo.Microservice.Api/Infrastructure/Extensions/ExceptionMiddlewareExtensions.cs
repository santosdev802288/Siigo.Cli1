using System;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;
using System.Collections.Generic;
using System.Linq;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Infrastructure.Extensions
{
    /// <summary>
    ///  Handler Main Application Exceptions
    /// </summary>
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app,
            IConfiguration configuration)
        {
            _ = app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.ContentType = "application/json";
                    IExceptionHandlerFeature contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        string appName = configuration["AppName"];
                        ErrorResponse errorDetails = GetErrorDetails(contextFeature, appName);
                        context.Response.StatusCode = errorDetails.Status;
                        string codes = errorDetails.Errors[0].Code;
                        string messages = errorDetails.Errors[0].Message;
                        string details = errorDetails.Errors[0].Detail;

                        if (errorDetails.Errors.Count > 1)
                        {
                            codes = string.Join('|', errorDetails.Errors.Select(error => error.Code));
                            messages = string.Join('|', errorDetails.Errors.Select(error => error.Message));
                            details = string.Join('|', errorDetails.Errors.Select(error => error.Detail));
                        }

                        await context.Response.WriteAsync(errorDetails.ToString());
                    }
                });
            });
        }

        /// <summary>
        /// Mapping Exceptions to ErrorDetails viewModel output 
        /// </summary>
        /// <param name="contextFeature"></param>
        /// <param name="appName"></param>
        /// <returns></returns>
        private static ErrorResponse GetErrorDetails(IExceptionHandlerFeature contextFeature, string appName)
        {
            // Controlled Exceptions 
            return contextFeature.Error switch
            {
                // Any Fluent Rules Business Validations 
                ClientErrorException clientErrorException => new ErrorResponse
                {
                    Status = clientErrorException.StatusCode,
                    Service = appName.ToLower(),
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Code = clientErrorException.Code,
                            Message = clientErrorException.Message,
                            Detail = clientErrorException.Details,
                            Source = clientErrorException.Source
                        }
                    }
                },
                ArgumentNullException argumentNullException => new ErrorResponse
                {
                    Status = StatusCodes.Status404NotFound,
                    Service = appName.ToLower(),
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Message = "NotFound Null Resource Validation",
                            Detail = argumentNullException.Message,
                            Source = argumentNullException.Source
                        }
                    }
                },
                // Fluent Validators in IRequest Instances 
                InvalidRequestException invalidRequestException => new ErrorResponse
                {
                    Status = StatusCodes.Status400BadRequest,
                    Service = appName.ToLower(),
                    Errors = invalidRequestException.Details
                },
                // Guard Validations
                ArgumentException argumentException => new ErrorResponse
                {
                    Status = StatusCodes.Status409Conflict,
                    Service = appName.ToLower(),
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Message = "Argument Exception (Guard)",
                            Detail = argumentException.Message,
                            Source = argumentException.Source
                        }
                    }
                },
                // Any Fluent Rules Business Validations 
                ValidationException validationException => new ErrorResponse
                {
                    Status = StatusCodes.Status409Conflict,
                    Service = appName.ToLower(),
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Code = GetErrorsCode(validationException.Message),
                            Message = "Conflict Business Validation",
                            Detail = validationException.Message,
                            Source = validationException.Source
                        }
                    }
                },
                // Controlled server exception
                ServerErrorException serverErrorException => new ErrorResponse
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Service = appName.ToLower(),
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Code = serverErrorException.Code,
                            Message = serverErrorException.Message,
                            Source = contextFeature.Error.Source,
                            Detail = serverErrorException.Details
                        }
                    }
                },
                // Exception Not Controlled => Internal Server Error
                _ => new ErrorResponse
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Service = appName.ToLower(),
                    Errors = new List<ErrorDetail>()
                    {
                        new ErrorDetail()
                        {
                            Message = "Internal Server Error",
                            Detail = contextFeature.Error.Message,
                            Source = contextFeature.Error.Source
                        }
                    }
                },
            };
        }

        private static string GetErrorsCode(string message)
        {
            string codes = "";
            string[] errors = message.Split("\r\n -- ");
            foreach (string error in errors)
            {
                if (!string.IsNullOrEmpty(error.Split(":")[0]) && !error.Split(":")[0].Equals("Validation failed"))
                    codes += error.Split(":")[0] + ",";
            }

            return codes.Substring(0, codes.Length - 1);
        }
    }
}
