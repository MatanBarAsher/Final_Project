using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography.Xml;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreferenceController : ControllerBase
    {
        // GET: api/<PreferenceController>
        [HttpGet]
        public List<Preference> ReadPreference()
        {
            Preference preference = new Preference();
            return preference.ReadPreference();
        }


        // POST api/<PreferenceController>
        [HttpPost]
        public int Post([FromBody] Preference preference)
        {
            return preference.InsertPreference();
        }

        //[HttpPut("Update")]
        //public Preference Update([FromBody] Preference preference)
        //{
        //    return preference.UpdatePreference(preference);
        //}
    }
}
