using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Serilog;
using Siigo.Core.Filter;
using Siigo.Core.Manager;
using Siigo.Core.Models;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Domain.Exception;


namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter
{
    /// <summary>
    /// File to get token info
    /// </summary>
    public class AuthorizeAttribute : TypeFilterAttribute
    {
        public AuthorizeAttribute(params string[] claim) : base(typeof(AuthorizeFilter))
        {
            Arguments = new object[] { claim };
        }
    }

    /// <summary>
    /// AuthorizeFilter 
    /// </summary>
    public class AuthorizeFilter : IAuthorizationFilter
    {
        public IConfiguration _configuration { get; }

        public AuthorizeFilter(IConfiguration Configuration, params string[] claim)
        {
            Log.Information("Claims are: ",claim.ToString());
            _configuration = Configuration;
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            var objTokenManager = new TokenManager(_configuration);
            PayloadTokenIdentity payload = null;
            var token = context.HttpContext.Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                context.Result = new UnauthorizedResult();
                throw new UnauthorizedException("unauthorized", "No autorizado");
            }
            else
            {
                if (await objTokenManager.DecodeIdentity(token, ref payload))
                {
                    context.HttpContext.Items.Add("User", payload);
                    context.HttpContext.Items.Add("companyKey", payload.cloud_tenant_company_key);
                    context.HttpContext.Items.Add("usersID", payload.users_id);
                }
                else
                {
                    context.Result = new UnauthorizedResult();
                    throw new UnauthorizedException("unauthorized", "No autorizado");
                }
            }
        }
    }
}