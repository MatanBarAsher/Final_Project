﻿namespace Make_a_move___Server.BL
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
        private static List<User> usersList = new List<User>();

        public User() { }

        public User(string email, string firstName, string lastName, string password, int gender, string[] image, int height, DateTime birthday, string phoneNumber, bool isActive)
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
    }


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
}
