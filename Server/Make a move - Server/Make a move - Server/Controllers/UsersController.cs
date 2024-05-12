using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public List<User> ReadUsers()
        {
            User user = new User();
            return user.ReadUsers();
        }

        // POST api/<UsersController>
        [HttpPost]
        public int Post([FromBody] User user)
        {
            return user.InsertUser();
        }

        [HttpPost("Login")]
        public bool CheckLogin([FromBody] LoginCredentials credentials)
        {
            return true;
        }

        [HttpPut("Update")]
        public User Update([FromBody] User user)
        {
            return user.UpdateUser(user);
        }

        [HttpPut("UpdatePlace")]
        public User UpdateUserCurrentPlace([FromBody] User user)
        {
            return user.UpdateUserCurrentPlace(user);
        }

        // POST: api/User/AddUserToDictionary
        [HttpPost("AddUserToDictionary")]
        public IActionResult AddUserToDictionary(string firstEmail, string secondEmail)
        {
            try
            {
                User user = new User { Email = firstEmail };
                user.AddToDictionary(secondEmail);
                return Ok("User added to dictionary successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPost("RemoveFromDictionary")]
        public IActionResult RemoveFromDictionary(string email)
        {
            try
            {
                User user = new User { Email = email };
                user.RemoveFromDictionary();
                return Ok("User removed from dictionary successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPost("SearchUserByEmail")]
        public IActionResult SearchUserByEmail(string email, string valueToCheck)
        {
            try
            {
                bool userExists = Make_a_move___Server.BL.User.SearchUserByEmail(email, valueToCheck);
                if (userExists)
                {
                    return Ok("User found in the dictionary.");
                }
                else
                {
                    return NotFound("User not found in the dictionary.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("GetDictionary")]
        public IActionResult GetDictionary()
        {
            try
            {
                Dictionary<string, string> dictionary = Make_a_move___Server.BL.User.GetDictionary();
                return Ok(dictionary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }





    }

}

