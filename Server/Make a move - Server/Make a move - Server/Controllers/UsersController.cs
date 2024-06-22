using Make_a_move___Server.BL;
using Make_a_move___Server.Controllers;
using Make_a_move___Server.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using System.Net;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using static Make_a_move___Server.BL.User;
using System.Net.Http;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;

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
        public async Task< Dictionary<string, Tuple<double, double>>> ReadUsersByPreference(string userEmail)
        {

            // Get the current user by email
            User u = new User();
            User currentUser = u.GetUserPreferencesByEmail(userEmail);

            // Check if the user exists
            if (currentUser == null)
            {
                // Return an empty dictionary if the user does not exist
                return new Dictionary<string, Tuple<double, double>>();
            }

            // Call ReadUsersByPreference to get users matching the preferences of the current user
            Dictionary<User, Tuple<double, double>> result = await currentUser.ReadUsersByPreference();

            // Convert User objects to strings (assuming User has a unique identifier)
            Dictionary<string, Tuple<double, double>> serializedResult = result.ToDictionary(
                kvp => kvp.Key.Email, // Assuming Email is a unique identifier
                kvp => kvp.Value);

            return serializedResult;
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
            User u = new();
            
            if (u.ChangeImages(email, imageLinks) != null)
            {
              // Return status code  
              return Ok(imageLinks);
            }
            else
            {
                return BadRequest("Img");
            }

        }

        [HttpPost("AddImages")]
        public ActionResult UploadImage(IFormFile file)
        {
            User _service = new();
            if (file != null && file.Length > 0)
            {
                try
                {
                    byte[] imageData;
                    using (var memoryStream = new MemoryStream())
                    {
                        file.CopyTo(memoryStream);
                        imageData = memoryStream.ToArray();
                    }
                    string mimeType = file.ContentType;

                    // Call your service method to add the image to the database
                    int imageId = _service.AddImage(imageData, mimeType);

                    return Ok(imageId);
                }
                catch (Exception ex)
                {
                    return StatusCode(500,"Error uploading image: " + ex.Message);
                }
            }
            else
            {
                return StatusCode(500, "Please select a file.");
            }

        }

        [HttpGet("GetImage")]
        public IActionResult GetImage(int imageId)
        {
            User _service = new();

            var (imageData, mimeType) = _service.GetImage(imageId);

            if (imageData == null)
            {
                return NotFound();
            }

            return File(imageData, mimeType); // Return the image with its MIME type
        }

        [HttpGet]
        [Route("GetUserByEmail/{email}")]

        public User GetUserByEmail([FromRoute] string email)
        {
            User _service = new();
            return _service.GetUserByEmail(email);
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

        // POST api/user/addpersonalinterests
        [HttpPost("addpersonalinterests")]
        public IActionResult AddPersonalInterests(string email, List<int> interestCodes)
        {
            DBservicesUser dbs = new DBservicesUser();
            try
            {
                dbs.InsertUserPersonalInterests(email, interestCodes);
                return Ok("Personal interests added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add personal interests: {ex.Message}");
            }
        }



        // GET api/user/interests/{email}
        [HttpGet("interests/{email}")]
        public IActionResult GetUserInterests(string email)
        {
            DBservicesUser dbs = new DBservicesUser();
            try
            {
                List<string> interestCodes = dbs.GetUserInterestCodesByEmail(email);
                return Ok(interestCodes);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve user interests: {ex.Message}");
            }
        }


    }

}


