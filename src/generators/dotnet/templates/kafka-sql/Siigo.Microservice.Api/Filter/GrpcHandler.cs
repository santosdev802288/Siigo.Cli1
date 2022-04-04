using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Siigo.Core.Logs;


namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter
{
    public class GrpcRequireemnt : IAuthorizationRequirement
    {

    }
    public class GrpcHandler : AuthorizationHandler<GrpcRequireemnt>
    {
        private static readonly SiigoLogger _logger = new(typeof(GrpcHandler));
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GrpcHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, GrpcRequireemnt requirement)
        {
            var items = _httpContextAccessor.HttpContext.Items;

            if (context.User.Claims == null || !context.User.Claims.Any())
            {
                context.Fail();
                return Task.CompletedTask;
            }

            foreach (Claim claim in context.User.Claims)
            {
                switch (claim.Type)
                {
                    case "cloud_tenant_company_key":
                        items.Add("companyKey", claim.Value);
                        break;
                    case "users_id":
                        items.Add("usersID", claim.Value);
                        break;
                    case "mail_siigo":
                        items.Add("username", claim.Value);
                        break;
                    case "tenant_id":
                        items.Add("tenantId", claim.Value);
                        break;
                    case "user_license_type":
                        items.Add("userLicenseType", claim.Value);
                        break;
                    case "plan_type":
                        items.Add("planType", claim.Value);
                        break;
                    case "tenant_state":
                        items.Add("tenantState", claim.Value);
                        break;
                    case "multitenant_id":
                        items.Add("multitenantid", claim.Value);
                        break;
                    case "role":
                        items.Add("role", claim.Value);
                        break;
                    case "cloud_tenant_id":
                        items.Add("cloudTenantId", claim.Value);
                        break;
                    case "cloud_tenant_producttype":
                        items.Add("cloudTenantProductType", claim.Value);
                        break;
                    case "is_send_active":
                        items.Add("isSendActive", claim.Value);
                        break;
                    case "productsubtype":
                        items.Add("productsubtype", claim.Value);
                        break;
                    default:
                        _logger.LogDebug($"Ignored claim: {claim.Type} = {claim.Value}");
                        break;
                }
            }
            context.Succeed(requirement);
            return Task.CompletedTask;

        }
    }
}
