using Make_a_move___Server.BL;
using Make_a_move___Server.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using System.Net;

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
        public User CheckLogin([FromBody] User user)
        {
            return user.CheckLogin();
        }

        [HttpPut("Update")]
        public User Update([FromBody] User user)
        {
            return user.UpdateUser(user);
        }

        [HttpGet("Report/{placeCode}")]
        public List<User> ReadUsersByPlace([FromRoute] string placeCode)
        {
            int p = Convert.ToInt32(placeCode);
            User user = new User();
            return user.ReadUsersByPlace(p);
        }



        [HttpPost]
        [Route("UpdatePlace/{email}")]
        public User UpdateUserCurrentPlace([FromRoute] string email, [FromBody] string placeName)
        {   User user = new User(); 
            return user.UpdateUserCurrentPlace(email, placeName);
        }

        // POST: api/User/AddUserToDictionary
        [HttpPost("AddUserToDictionary")]
        public IActionResult AddUserToDictionary(string firstEmail, string secondEmail)
        {
            try
            {
                User user = new User { Email = firstEmail };
                user.AddToDictionary(firstEmail,secondEmail);
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
                user.RemoveFromDictionary(email); // Provide the email parameter
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
                Dictionary<string, List<string>> dictionary = Make_a_move___Server.BL.User.GetDictionary();
                return Ok(dictionary);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpPost("LikeUser")]
        public IActionResult LikeUser(string userEmail, string likedUserEmail)
        {
            try
            {
                // Create an instance of the User class
                User user = new User();

                // Call the LikeUser method on the instance
                bool isLiked = user.LikeUser(userEmail, likedUserEmail);

                if (isLiked)
                {
                    // Return message if the user is already liked
                    return Ok("We have a match!");
                }
                else
                {
                    // Return message if the like was added
                    return Ok("Like added successfully.");
                }
            }
            catch (Exception ex)
            {
                // Return error message if an exception occurs
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("ReadUsersByPreference")]
        public IActionResult ReadUsersByPreference(string userEmail)
        {
            try
            {
                // Get the current user by email
                User currentUser = Make_a_move___Server.BL.User.GetUserByEmail(userEmail);

                // Check if the user exists
                if (currentUser == null)
                {
                    // Return a not found response if the user does not exist
                    return NotFound($"User with email {userEmail} not found.");
                }

                // Call ReadUsersByPreference to get users matching the preferences of the current user
                Dictionary<User, double> usersByPreference = currentUser.ReadUsersByPreference(currentUser);

                // Return the list of users
                return Ok(usersByPreference);
            }
            catch (Exception ex)
            {
                // Return an error response if an exception occurs
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

       

    //[HttpPut]
    //[Route("changeImages/{email}")]
    //public int ChangeImages([FromRoute] string email, [FromForm] List<IFormFile> images)
    //{
    //    List<string> imageLinks = new List<string>();

    //    string path = System.IO.Directory.GetCurrentDirectory();

    //    long size = images.Sum(f => f.Length);

    //    foreach (var formFile in images)
    //    {
    //        if (formFile.Length > 0)
    //        {
    //            var filePath = Path.Combine(path, "uploadedFiles/" + formFile.FileName);

    //            using (var stream = System.IO.File.Create(filePath))
    //            {
    //                 formFile.CopyToAsync(stream);
    //            }
    //            imageLinks.Add(formFile.FileName);
    //        }
    //    }
    //    string[] imageLinksArray = imageLinks.ToArray();
    //    User user = new User();
    //    return user.ChangeImages(email, imageLinksArray);
    //}




        //[HttpPut]
        //[Route("changeImages/{email}")]
        //public int ChangeImages([FromRoute] string email, [FromForm] List<IFormFile> images)
        //{
        //    List<string> imageLinks = new List<string>();

        //    string path = System.IO.Directory.GetCurrentDirectory();

        //    long size = images.Sum(f => f.Length);

        //    foreach (var formFile in images)
        //    {
        //        if (formFile.Length > 0)
        //        {
        //            var filePath = Path.Combine(path, "uploadedFiles/" + formFile.FileName);

        //            using (var stream = System.IO.File.Create(filePath))
        //            {
        //                 formFile.CopyToAsync(stream);
        //            }
        //            imageLinks.Add(formFile.FileName);
        //        }
        //    }
        //    string[] imageLinksArray = imageLinks.ToArray();
        //    User user = new User();
        //    return user.ChangeImages(email, imageLinksArray);
        //}



        [HttpPost]
        [Route("changeImages/{email}")]

        public async Task<IActionResult> ChangeImages([FromForm] List<IFormFile> files, [FromRoute] string email)
        {


            List<string> imageLinks = new List<string>();

            string path = System.IO.Directory.GetCurrentDirectory();

            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var filePath = Path.Combine(path, "uploadedFiles/" + formFile.FileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    imageLinks.Add(formFile.FileName);
                }
            }

            // Return status code  
            return Ok(imageLinks);

        }










        [HttpPost]
        [Route("checkExistingUserByKeyAndValue/{key}")]
        public int checkExistingUserByKeyAndValue([FromRoute] string key , [FromBody] string value)
        {
            User u = new User();
            return u.checkExistingUserByKeyAndValue(key, value);
        }




        [HttpPost("EditPreferences")]
        public User EditPreferences([FromBody] User user)
        {

            User u = new();

            return u.EditPreferences(user);
        }


        [HttpGet("getEmails")]
        public List<string> GetUsersEmails()
        {
            User user = new User();
            return user.GetUsersEmails();
        }

    }

}

