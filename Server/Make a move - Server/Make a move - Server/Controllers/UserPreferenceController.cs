using Make_a_move___Server.BL;
using Make_a_move___Server.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using System.Net;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Make_a_move___Server.Controllers
{
    public class UserPreferenceController : Controller
    {

        // GET:  api/<UserPreferenceController>
        [HttpGet("Read")]
        public List<UserPreferences> ReadUserPreference()
        {
            UserPreferences userPreferences = new UserPreferences();
            return UserPreferences.ReadUserPreference();
        }

        // POST :  api/<UserPreferenceController>
        [HttpPost("Insert")]
        public int Post([FromBody] UserPreferences userPreferences)
        {
            return userPreferences.InsertUserPreference();
        }

        [HttpPut("Update")]
        public UserPreferences Update([FromBody] UserPreferences userPreferences)
        {
            return userPreferences.UpdateUserPreferences(userPreferences);
        }


        public IActionResult Index()
        {
            return View();
        }
    }
}
