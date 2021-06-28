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

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<string> ExampleQuery(int id)
            => await ClientGRPC.SendMessage(id);

    }
}
