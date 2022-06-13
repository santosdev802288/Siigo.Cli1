using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Core.Interceptors;
using MongoDB.Driver;
using Newtonsoft.Json;
using NuGet.Packaging;
using Siigo.Core.Logs;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.SeedWork;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter
{
    public class ExceptionInterceptor : Interceptor
    {
        private readonly SiigoLogger _logger = new();

        public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
            TRequest request,
            ServerCallContext context,
            UnaryServerMethod<TRequest, TResponse> continuation)
        {
            try
            {
                return await continuation(request, context);
            }
            catch (InvalidRequestException e)
            {
                var metadata = new Metadata();

                metadata.AddRange(
                    from errorDetail
                        in e.Details
                    select new Metadata.Entry(
                        errorDetail.Code,
                        errorDetail.Message
                    )
                );
                
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Error"), metadata, e.Details.First().Message);
            }
            catch (FormatException e)
            {
                _logger.LogError(e.Message);
                throw new RpcException(new Status(StatusCode.InvalidArgument, e.Message), new Metadata(), e.Message);
            }
            catch (MongoException e)
            {
                _logger.LogError(e.Message);
                throw new RpcException(new Status(StatusCode.Aborted, e.Message), new Metadata(), e.Message);
            }
            catch (ArgumentException e)
            {
                _logger.LogError(e.Message);
                throw new RpcException(new Status(StatusCode.InvalidArgument, e.Message), new Metadata(), e.Message);
            }
            catch (DomainRuleValidationException e)
            {
                _logger.LogError(e.Message);
                throw new RpcException(new Status(StatusCode.InvalidArgument, e.Message), new Metadata(), e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw new RpcException(new Status(StatusCode.Internal, e.Message), new Metadata(), e.Message);
            }
        }
    }
}