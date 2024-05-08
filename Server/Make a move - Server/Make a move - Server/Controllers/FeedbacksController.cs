using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        // GET: api/<FeedbacksController>
        [HttpGet]
        public List<Feedback> ReadFeedback()
        {
            Feedback feedback = new Feedback();
            return feedback.ReadFeedback();
        }


        // POST api/<FeedBacksController>
        [HttpPost]
        public int Post([FromBody] Feedback feedback)
        {
            return feedback.InsertFeedback();
        }


        [HttpPut("Update")]
        public Feedback Update([FromBody] Feedback feedback)
        {
            return feedback.UpdateFeedback(feedback);
        }

    }
}
