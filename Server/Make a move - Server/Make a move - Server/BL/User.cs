using Make_a_move___Server.DAL;
using System;
using System.Security.Cryptography.Xml;
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
        private City city;
        private Preference [] preference;
        private PersonalInterests [] personalInterests;
        private static List<User> usersList = new List<User>();

        public User() { }

        public User(string email, string firstName, string lastName, string password, int gender, string[] image, int height, DateTime birthday, string phoneNumber, bool isActive, City city, Preference[] preference, PersonalInterests[] personalInterests)
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
            this.preference = preference;
            this.personalInterests = personalInterests;
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
        public City City { get => city; set => city = value; }
        public Preference [] Preference { get => preference; set => preference = value; }
        public PersonalInterests [] personalInterest { get => personalInterest; set => personalInterest = value; }



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
        //public User CheckLogin()
        //{
        //    try
        //    {
        //        DBservicesUser dbs = new DBservicesUser();
        //        return dbs.CheckLogin(this);
        //    }
        //    catch (Exception ex)
        //    {
        //        Log or handle the exception appropriately
        //        throw new Exception("Error checking login", ex);
        //    }
        //}
        public User UpdateUser(User newUser)
        {
            try
            {
                // Find the user in the UsersList by email
                User userToUpdate = usersList.Find(u => string.Equals(u.Email.Trim(), newUser.Email.Trim(), StringComparison.OrdinalIgnoreCase));

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
                    userToUpdate.preference = newUser.preference;
                    userToUpdate.personalInterests = newUser.personalInterests;


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
    }
}
