using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Moq;
using Siigo.Core.Filter;
using Siigo.Core.Manager;
using Xunit;

namespace <%= config.projectPrefix %>.Extensions.Tests.Security
{
    public class AuthorizeFilterTest
{
    // Use SQLConnectionFactory instead of opening a new SQLConnection per query
    private readonly Mock<IConfiguration> _iConfiguration;
    private readonly Mock<ITokenManager> _tokenManager;

    private readonly AuthorizeFilter _authorizeFilter;

    public AuthorizeFilterTest()
    {
        _iConfiguration = new Mock<IConfiguration>();
        _tokenManager = new Mock<ITokenManager>();
        _authorizeFilter = new AuthorizeFilter(_tokenManager.Object, _iConfiguration.Object, new[] { "" });
    }

    [Fact]
    public void OnAuthorizationOk()
    {
        Action act = () => _authorizeFilter.OnAuthorizationAsync(new AuthorizationFilterContext(null, null));
        Assert.Throws<ArgumentNullException>(act);
    }

}
}
