using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        // GET: api/<MatchesController>
        [HttpGet]
        public List<Match> ReadMatches()
        {
            Match match = new Match();
            return match.ReadMatches();
        }


        // POST api/<MatchesController>
        [HttpPost]
        public int Post([FromBody] Match match)
        {
            return match.InsertMatch();
        }

        //[HttpPut("Update")]
        //public Match Update([FromBody] Match match)
        //{
        //    return match.UpdateMatch(match);
        //}
    }
}
