using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class SecondFeedbackController : Controller
    {

        
        // GET: api/<SecondFeedbacksController>
        [HttpGet]
        public List<SecondFeedback> ReadFeedback()
        {
            SecondFeedback secondFeedback = new SecondFeedback();
            return secondFeedback.ReadFeedback();
        }


        // POST api/<SecondFeedbacksController>
        [HttpPost]
        public int Post([FromBody] SecondFeedback secondFeedback)
        {
            return secondFeedback.InsertFeedback();
        }
    }
}
