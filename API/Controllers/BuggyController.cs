using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApi
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("Bad Request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Server Error");
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("not-a-guid")]
        public ActionResult GetNotAGuid()
        {
            return BadRequest("Invalid Guid");
        }
    }
}