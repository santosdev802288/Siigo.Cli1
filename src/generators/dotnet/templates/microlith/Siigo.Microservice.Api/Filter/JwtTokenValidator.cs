using System;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Api.Filter
{
    public class JwtTokenValidator : ISecurityTokenValidator
    {
        private IConfiguration _configuration;
        public JwtTokenValidator(IConfiguration _config){
            _configuration = _config;
        }
        public bool CanReadToken(string securityToken) => true;

        public ClaimsPrincipal ValidateToken(string securityToken, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
        {
            var handler = new JwtSecurityTokenHandler();
            string cetificateString = _configuration[_configuration["KeyVault:CertificateName"]];
            X509Certificate2 certificate2 = new(Convert.FromBase64String(cetificateString), string.Empty, X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet | X509KeyStorageFlags.Exportable);
            var tokenValidationParameters = new TokenValidationParameters
            {
                RequireSignedTokens = Convert.ToBoolean(_configuration["SecurityTokenSettings:RequireSignedTokens"], CultureInfo.InvariantCulture),
                ValidateAudience = Convert.ToBoolean(_configuration["SecurityTokenSettings:ValidateAudience"], CultureInfo.InvariantCulture),
                ValidateIssuer = Convert.ToBoolean(_configuration["SecurityTokenSettings:ValidateIssuer"], CultureInfo.InvariantCulture),
                ValidateLifetime = Convert.ToBoolean(_configuration["SecurityTokenSettings:ValidateLifetime"], CultureInfo.InvariantCulture),
                ValidateIssuerSigningKey = Convert.ToBoolean(_configuration["SecurityTokenSettings:ValidateIssuerSigningKey"], CultureInfo.InvariantCulture),
                ValidIssuer = _configuration["SecurityTokenSettings:ValidIssuer"],
                ValidAudiences = new[] { _configuration["SecurityTokenSettings:ValidAudiences"] },
                IssuerSigningKey = new X509SecurityKey(certificate2)
            };

            var claimsPrincipal = handler.ValidateToken(securityToken, tokenValidationParameters, out validatedToken);
            
            return claimsPrincipal;
        }

        public bool CanValidateToken { get; } = true;
        public int MaximumTokenSizeInBytes { get; set; } = int.MaxValue;
    }
}