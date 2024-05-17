using Make_a_move___Server.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.Xml;
using System.Xml.Linq;
namespace Make_a_move___Server.BL
{
    public class User
    {
        private string email;
        private string firstName;
        private string lastName;
        private string password;
        private int gender;
        private string[] image;
        private int height;
        private DateTime birthday;
        private string phoneNumber;
        private bool isActive;
        private string city;
        //private string[] preferencesIds;
        private string[] personalInterestsIds;
        private int currentPlace;
        private string persoalText;
        private static List<User> usersList = new List<User>();
        //private static Dictionary<string, string> usersDictionary = new Dictionary<string, string>();
        private static Dictionary<string, List<string>> likedRelationships = new Dictionary<string, List<string>>();
        private Dictionary<string, string> preferencesDictionary = new Dictionary<string, string>();




        public User() { }

        public User(string email, string firstName, string lastName, string password, int gender, string[] image, int height, DateTime birthday, string phoneNumber, bool isActive, string city, string[] personalInterestsIds, int currentPlace, string persoalText, Dictionary<string, string> preferencesDictionary)
        {
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
            this.gender = gender;
            this.image = image;
            this.height = height;
            this.birthday = birthday;
            this.phoneNumber = phoneNumber;
            this.isActive = isActive;
            this.city = city;
            //this.preferencesIds = preferencesIds;
            this.personalInterestsIds = personalInterestsIds;
            this.currentPlace = currentPlace;
            this.persoalText = persoalText;
            this.PreferencesDictionary = preferencesDictionary;



        }


        public string Email { get => email; set => email = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Password { get => password; set => password = value; }
        public int Gender { get => gender; set => gender = value; }
        public string[] Image { get => image; set => image = value; }
        public int Height { get => height; set => height = value; }
        public DateTime Birthday { get => birthday; set => birthday = value; }
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public string City { get => city; set => city = value; }
        public string[] PersonalInterestsIds { get => personalInterestsIds; set => personalInterestsIds = value; }
        //public string[] PreferencesIds { get => preferencesIds; set => preferencesIds = value; }

        public int CurrentPlace { get => currentPlace; set => currentPlace = value; }
        public string PersoalText { get => persoalText; set => persoalText = value; }
        public Dictionary<string, string> PreferencesDictionary { get => preferencesDictionary; set => preferencesDictionary = value; }

        //Get& Set to dictionary?


        public int InsertUser()
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                usersList.Add(this);
                return dbs.InsertUser(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting user", ex);
            }
        }

        public List<User> ReadUsers()
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                return dbs.ReadUsers();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading users", ex);
            }
        }
        //working- without remove from the dictionary after logged out
        //public User CheckLogin()
        //{
        //    try
        //    {
        //        DBservicesUser dbs = new DBservicesUser();
        //        return dbs.CheckLogin(this);

        //    }
        //    catch (Exception ex)
        //    {
        //        //    Log or handle the exception appropriately
        //        throw new Exception("Error checking login", ex);
        //    }
        //}
        public User CheckLogin()
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                User loggedInUser = dbs.CheckLogin(this);

                // If login is successful, return the logged-in user
                if (loggedInUser != null)
                {
                    return loggedInUser;
                }
                else
                {
                    // If login fails (user is not found), remove the user from the dictionary
                    RemoveFromDictionary(this.Email);
                    return null;
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error checking login", ex);
            }
        }



        public User UpdateUser(User newUser)
        {
            try

            {
                DBservicesUser dbs1 = new DBservicesUser();
                List<User> list = dbs1.ReadUsers();
                // Find the user in the UsersList by email
                User userToUpdate = list.Find(u => string.Equals(u.Email.Trim(), newUser.Email.Trim(), StringComparison.OrdinalIgnoreCase));

                if (userToUpdate != null)
                {
                    // Update user information
                    userToUpdate.FirstName = newUser.FirstName;
                    userToUpdate.LastName = newUser.LastName;
                    userToUpdate.Password = newUser.Password;
                    userToUpdate.IsActive = newUser.IsActive;
                    userToUpdate.gender = newUser.gender;
                    userToUpdate.image = newUser.image;
                    userToUpdate.height = newUser.height;
                    userToUpdate.birthday = newUser.birthday;
                    userToUpdate.phoneNumber = newUser.phoneNumber;
                    userToUpdate.city = newUser.city;
                    //userToUpdate.preferencesIds = newUser.preferencesIds;
                    userToUpdate.personalInterestsIds = newUser.personalInterestsIds;
                    userToUpdate.currentPlace = newUser.currentPlace;
                    userToUpdate.preferencesDictionary = newUser.preferencesDictionary;
                    userToUpdate.persoalText = newUser.persoalText;




                    // Update in the database (assuming DBservices has an UpdateUser method)
                    DBservicesUser dbs = new DBservicesUser();
                    return dbs.UpdateUser(userToUpdate);
                }
                else
                {
                    // User not found, handle the case appropriately (return null, throw an exception, etc.)
                    return null; // Or throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error updating user", ex);
            }
        }


        public User UpdateUserCurrentPlace(User newUser)
        {
            try
            {
                DBservicesUser dbs1 = new DBservicesUser();
                List<User> list = dbs1.ReadUsers();
                // Find the user in the UsersList by email
                User userToUpdate = list.Find(u => string.Equals(u.Email.Trim(), newUser.Email.Trim(), StringComparison.OrdinalIgnoreCase));


                if (userToUpdate != null)
                {
                    // Update the currentPlace field
                    userToUpdate.CurrentPlace = newUser.CurrentPlace;

                    // Update in the database
                    DBservicesUser dbs = new DBservicesUser();
                    dbs.UpdateUserCurrentPlace(userToUpdate);

                    return userToUpdate;
                }
                else
                {
                    // User not found, handle the case appropriately (return null, throw an exception, etc.)
                    return null; // Or throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error updating user", ex);
            }
        }
        public List<User> ReadUsersByPlace(int placeCode)
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                return dbs.ReadUsersByPlace(placeCode);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading users", ex);
            }
        }



        //public bool CheckPreferenceses(User u)
        //{
        //    // Check if the user's preferences dictionary contains all required keys
        //    if (u.PreferencesDictionary.ContainsKey("gender") &&
        //        u.PreferencesDictionary.ContainsKey("age") &&
        //        u.PreferencesDictionary.ContainsKey("maxDistance") &&
        //        u.PreferencesDictionary.ContainsKey("height"))
        //    {
        //        // Retrieve values from the preferences dictionary
        //        string genderValue = u.PreferencesDictionary["gender"];
        //        int ageValue = int.Parse(u.PreferencesDictionary["age"]);
        //        int maxDistanceValue = int.Parse(u.PreferencesDictionary["maxDistance"]);
        //        int heightValue = int.Parse(u.PreferencesDictionary["height"]);

        //        // Check if the values match the current user's properties
        //        if (genderValue == this.Gender.ToString() &&  
        //            heightValue == this.Height)
        //        {
        //            return true;
        //        }
        //    }
        //    return false;
        //}

        public int CalculateAge()
        {
            DateTime today = DateTime.Today;
            int age = today.Year - this.Birthday.Year;
            if (this.Birthday > today.AddYears(-age))
            {
                age--;
            }
            return age;
        }


        public bool CheckPreferenceses(User u)
        {
            if (this.PreferencesDictionary["gender"] == u.gender.ToString() &&
                //this.PreferencesDictionary["age"] == u.age.ToString() &&
                this.PreferencesDictionary["height"] == u.height.ToString()
                //this.PreferencesDictionary["maxDistance"] == u.___.ToString()
                )
            {
                return true;
            }
            return false;
        }


        public List<User> ReadUsersByPreference(User user)
        {
            List<User> list = user.ReadUsersByPlace(user.currentPlace);
            List<User> result = new List<User>();
            foreach (User u in list)
            {
                if (user.CheckPreferenceses(u))
                {
                    result.Add(user);
                }
            }
            return result;

        }

        public static User GetUserByEmail(string email)
        {
            try
            {
                // Create an instance of your DAL service
                DBservicesUser dbs = new DBservicesUser();

                // Call the method in your DAL to retrieve the user by email
                User user = dbs.GetUserByEmail(email);

                // Return the user fetched from the database
                return user;
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error getting user by email", ex);
            }
        }



       


        //-------------------------------------------------------------------

        //public void AddToDictionary(string secondEmail)
        //{
        //    try
        //    {
        //        usersDictionary.Add(this.Email, secondEmail);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        // Handle the case where the key already exists in the dictionary
        //        // You can log the error or handle it as needed
        //        throw new Exception("User with the same email already exists in the dictionary.", ex);
        //    }
        //}

        //// Method to remove a user from the dictionary
        //public void RemoveFromDictionary()
        //{
        //    usersDictionary.Remove(this.Email);
        //}

        //// Method to get the second user's email from the dictionary by the first user's email
        //public static string getseconduseremail(string firstuseremail)
        //{
        //    if (usersDictionary.ContainsKey(firstuseremail))
        //    {
        //        return usersDictionary[firstuseremail];
        //    }
        //    else
        //    {
        //        // handle the case where the user with the specified email is not found
        //        // you can return null or throw an exception as needed
        //        return null; // or throw new exception("user not found in the dictionary.");
        //    }
        //}

        //public static bool SearchUserByEmail(string email, string valueToCheck)
        //{
        //    if (usersDictionary.TryGetValue(email, out string value))
        //    {
        //        return value == valueToCheck;
        //    }
        //    else
        //    {
        //        // Handle the case where the user with the specified email is not found
        //        return false;
        //    }
        //}
        //public static Dictionary<string, string> GetDictionary()
        //{
        //    return usersDictionary;
        //}



        public void AddToDictionary(string userEmail, string likedUserEmail)
        {
            try
            {
                if (!likedRelationships.ContainsKey(userEmail))
                {
                    likedRelationships[userEmail] = new List<string>();
                }

                likedRelationships[userEmail].Add(likedUserEmail);
            }
            catch (ArgumentException ex)
            {
                // Handle the case where the key already exists in the dictionary
                // You can log the error or handle it as needed
                throw new Exception("User with the same email already exists in the dictionary.", ex);
            }
        }

        // Method to remove a user from the dictionary
        public void RemoveFromDictionary(string userEmail)
        {
            likedRelationships.Remove(userEmail);
        }

        // Method to get the list of liked users' emails from the dictionary by the user's email
        public List<string> GetLikedUsersByEmail(string userEmail)
        {
            if (likedRelationships.ContainsKey(userEmail))
            {
                return likedRelationships[userEmail];
            }
            else
            {
                // handle the case where the user with the specified email is not found
                // you can return an empty list or throw an exception as needed
                return new List<string>(); // or throw new exception("user not found in the dictionary.");
            }
        }

        public static bool SearchUserByEmail(string userEmail, string targetUserEmail)
        {
            if (likedRelationships.TryGetValue(userEmail, out List<string> likedUsers))
            {
                return likedUsers.Contains(targetUserEmail);
            }
            else
            {
                // Handle the case where the user with the specified email is not found
                return false;
            }
        }

        public static Dictionary<string, List<string>> GetDictionary()
        {
            return likedRelationships;
        }

        //public int ChangeImages(string email, string[] images) {
        //    try
        //    {
        //        //DBservicesUser dbs = new DBservicesUser();
        //        //return dbs.ChangeUserImages(email, images);
                
        //    }
        //    catch (Exception ex)
        //    {
        //        //    Log or handle the exception appropriately
        //        throw new Exception("Error changing images", ex);
        //    }
        //}

        public bool LikeUser(string userEmail, string likedUserEmail)
        {
            // Call AddToDictionary to add the liked user
            AddToDictionary(userEmail, likedUserEmail);

            // Call SearchUserByEmail to check if there is a match
            return SearchUserByEmail(likedUserEmail, userEmail);
        }






    }
}
