using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Serilog;
using Siigo.Core.Security.Manager;
using Siigo.Core.Security.Models;
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
        public IConfiguration Configuration { get; }

        public AuthorizeFilter(IConfiguration Configuration, params string[] claim)
        {
            Log.Information("Claims are: ", claim.ToString());
            this.Configuration = Configuration;
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            TokenManager objTokenManager = new(Configuration);
            PayloadTokenIdentity payload = null;
            string token = context.HttpContext.Request.Headers["Authorization"].ToString();
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
