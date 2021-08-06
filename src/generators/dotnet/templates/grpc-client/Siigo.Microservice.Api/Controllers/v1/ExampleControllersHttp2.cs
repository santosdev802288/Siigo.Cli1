using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using <%= config.projectPrefix %>.<%= config.nameCapitalize %>.Infrastructure;

namespace Siigo.Noticli.Api.Controllers.v1
{

    [ApiController()]
    [Route("api/v1/[controller]/[action]")]
    [Produces("application/json")]
    public class ExampleControllerHttp2
    {
        private readonly ClientGRPC client = new();

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(string), (int) HttpStatusCode.OK)]
        public async Task<string> ExampleQuery(int id)
            => await client.SendMessage(id);

    }
}
