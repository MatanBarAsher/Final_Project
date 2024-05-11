using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using Make_a_move___Server.BL;

namespace Make_a_move___Server.DAL
{
    public class DBservicesUser
    {
        public SqlConnection connect(String conString)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

      
       //--------------------------------------------------------------------------------------------------
       // This method Inserts a User to the Users table 
       // --------------------------------------------------------------------------------------------------

        public int InsertUser(User user)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                // create the connection
                con = connect("myProjDB");
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateUserInsertCommandWithStoredProcedure("SP_InsertNewUser", con, user);  // create the command

            try
            {
                // execute the command
                int numEffected = cmd.ExecuteNonQuery();
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //---------------------------------------------------------------------------------
        // Create the SqlCommand for insrting new user using a stored procedure
        //---------------------------------------------------------------------------------

        private SqlCommand CreateUserInsertCommandWithStoredProcedure(String spName, SqlConnection con, User user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@email", user.Email);

            cmd.Parameters.AddWithValue("@firstName", user.FirstName);

            cmd.Parameters.AddWithValue("@lastName", user.LastName);

            cmd.Parameters.AddWithValue("@password", user.Password);

            cmd.Parameters.AddWithValue("@gender", user.Gender);

            string images = JsonSerializer.Serialize(user.Image);
            cmd.Parameters.AddWithValue("@image", images);

            cmd.Parameters.AddWithValue("@height", user.Height);

            cmd.Parameters.AddWithValue("@birthday", user.Birthday);

            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber);

            cmd.Parameters.AddWithValue("@city", user.City);
            
            string PreferencesIdsS = JsonSerializer.Serialize(user.PreferencesIds);
            cmd.Parameters.AddWithValue("@preferencesIds", PreferencesIdsS);

            string PersonalInterestsIdsS = JsonSerializer.Serialize(user.PersonalInterestsIds);
            cmd.Parameters.AddWithValue("@personalInterestsIds", PersonalInterestsIdsS);

            cmd.Parameters.AddWithValue("@currentPlace", user.CurrentPlace);

            
            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // This method reads users from the database 
        //--------------------------------------------------------------------------------------------------
        public List<User> ReadUsers()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> usersList = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateSelectUserWithStoredProcedure("SP_ReadUsers", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User u = new User();
                    u.Email = dataReader["email"].ToString();
                    u.FirstName = dataReader["firstName"].ToString();
                    u.LastName = dataReader["lastName"].ToString();
                    u.Password = dataReader["password"].ToString();
                    u.Image = JsonSerializer.Deserialize<string[]>(dataReader["image"].ToString());
                    u.Gender = Convert.ToInt32(dataReader["gender"]);
                    u.Height = Convert.ToInt32(dataReader["height"]);
                    u.Birthday = Convert.ToDateTime(dataReader["birthday"]);
                    u.PhoneNumber = dataReader["phoneNumber"].ToString();
                    u.IsActive = Convert.ToBoolean(dataReader["isActive"]);
                    u.City = dataReader["city"].ToString();
                    u.PersonalInterestsIds = JsonSerializer.Deserialize<string[]>(dataReader["personalInterestsIds"].ToString());
                    u.PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString());
                    u.CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]);
                    //u.City = new City
                    //{
                    //    CityCode = Convert.ToInt32(dataReader["cityCode"]),
                    //    CityName = dataReader["cityName"].ToString()
                    //};
                    //u.Preference = new Preference
                    //{
                    //    PreferenceCode = Convert.ToInt32(dataReader["serialNumber"]),
                    //    PreferenceDescription = dataReader["fddbackDescription"].ToString(),
                    //    FirstOption = dataReader["firstOption"].ToString(),
                    //    SecondOption = dataReader["secondOption"].ToString(),
                    //    ThirdOption = dataReader["thirdOption"].ToString(),
                    //    FourthOption = dataReader["FourthOption"].ToString(),
                    //    Required = Convert.ToBoolean(dataReader["fddbackDescription"])
                    //};
                    //u.personalInterests = new PersonalInterests
                    //{
                    //    InterestCode = Convert.ToInt32(dataReader["interestCode"]),
                    //    InterestDesc = dataReader["interestDesc"].ToString(),
                    //};

                    usersList.Add(u);
                }
                return usersList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //---------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure
        //---------------------------------------------------------------------------------
        private SqlCommand CreateSelectUserWithStoredProcedure(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // This method Updates a user at user table 
        //--------------------------------------------------------------------------------------------------

        public User UpdateUser(User user)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateUserUpdateCommandWithStoredProcedure("SP_UpdateUser", con, user);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                User u = null; // Initialize the User object

                while (dataReader.Read())
                {
                    u = new User
                    {
                        Email = dataReader["email"].ToString(),
                        FirstName = dataReader["firstName"].ToString(),
                        LastName = dataReader["familyName"].ToString(),
                        Password = dataReader["password"].ToString(),
                        Image = JsonSerializer.Deserialize<string[]>(dataReader["image"].ToString()),
                    //Image = dataReader["image"].ToString(),
                        Gender = Convert.ToInt32(dataReader["gender"]),
                        Height = Convert.ToInt32(dataReader["height"]),
                        Birthday = Convert.ToDateTime(dataReader["birthday"]),
                        PhoneNumber = dataReader["phoneNumber"].ToString(),
                        IsActive = Convert.ToBoolean(dataReader["isActive"]),
                        City = dataReader["city"].ToString(),
                        PersonalInterestsIds = JsonSerializer.Deserialize<string[]>(dataReader["personalInterestsIds"].ToString()),
                        PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString()),
                        CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]),
                    //City = new City
                    //{
                    //    CityCode = Convert.ToInt32(dataReader["cityCode"]),
                    //    CityName = dataReader["cityName"].ToString()
                    //},
                    //Preference = new Preference
                    //{
                    //    PreferenceCode = Convert.ToInt32(dataReader["serialNumber"]),
                    //    PreferenceDescription = dataReader["fddbackDescription"].ToString(),
                    //    FirstOption = dataReader["firstOption"].ToString(),
                    //    SecondOption = dataReader["secondOption"].ToString(),
                    //    ThirdOption = dataReader["thirdOption"].ToString(),
                    //    FourthOption = dataReader["FourthOption"].ToString(),
                    //    Required = Convert.ToBoolean(dataReader["fddbackDescription"])
                    //},
                    //personalInterests = new PersonalInterests
                    //{
                    //    InterestCode = Convert.ToInt32(dataReader["interestCode"]),
                    //    InterestDesc = dataReader["interestDesc"].ToString(),
                    //}
                };
                }

                if (u != null)
                {
                    // Login successful
                    return u;
                }
                else
                {
                    // Login failed, return null or throw an exception as needed
                    return null;
                }
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        //---------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure
        //---------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------
        private SqlCommand CreateUserUpdateCommandWithStoredProcedure(String spName, SqlConnection con, User user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@email", user.Email);

            cmd.Parameters.AddWithValue("@firstName", user.FirstName);

            cmd.Parameters.AddWithValue("@lastName", user.LastName);

            cmd.Parameters.AddWithValue("@password", user.Password);

            cmd.Parameters.AddWithValue("@gender", user.Gender);

            string images = JsonSerializer.Serialize(user.Image);
            cmd.Parameters.AddWithValue("@image", images);

            cmd.Parameters.AddWithValue("@height", user.Height);

            cmd.Parameters.AddWithValue("@birthday", user.Birthday);

            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber);

            cmd.Parameters.AddWithValue("isActive", user.IsActive);

            cmd.Parameters.AddWithValue("@city", user.City);

            string PreferencesIdsS = JsonSerializer.Serialize(user.PreferencesIds);
            cmd.Parameters.AddWithValue("@preferencesIds", PreferencesIdsS);

            string PersonalInterestsIdsS = JsonSerializer.Serialize(user.PersonalInterestsIds);
            cmd.Parameters.AddWithValue("@personalInterestsIds", PersonalInterestsIdsS);

            cmd.Parameters.AddWithValue("@currentPlace", user.CurrentPlace);


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // This method checks a user login at user table 
        //--------------------------------------------------------------------------------------------------

        public User CheckLogin(User user)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateLoginCommandWithStoredProcedure("SP_CheckLogin", con, user); // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                User u = null; // Initialize the User object

                while (dataReader.Read())
                {
                    u = new User
                    {
                        Email = dataReader["email"].ToString(),
                        FirstName = dataReader["firstName"].ToString(),
                        LastName = dataReader["familyName"].ToString(),
                        Password = dataReader["password"].ToString(),
                        Image = ((string[])dataReader["image"]),
                        Gender = Convert.ToInt32(dataReader["gender"]),
                        Height = Convert.ToInt32(dataReader["height"]),
                        Birthday = Convert.ToDateTime(dataReader["birthday"]),
                        PhoneNumber = dataReader["phoneNumber"].ToString(),
                        IsActive = Convert.ToBoolean(dataReader["isActive"]),
                        City = dataReader["city"].ToString(),
                        PreferencesIds = ((string[])dataReader["preferencesIds"]),
                        PersonalInterestsIds = ((string[])dataReader["personalInterestsIds"]),
                        CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]),
                        //City = new City
                        //{
                        //    CityCode = Convert.ToInt32(dataReader["cityCode"]),
                        //    CityName = dataReader["cityName"].ToString()

                        //},
                        //Preference = new Preference 
                        //{
                        //    PreferenceCode = Convert.ToInt32(dataReader["serialNumber"]),
                        //    PreferenceDescription = dataReader["fddbackDescription"].ToString(),
                        //    FirstOption = dataReader["firstOption"].ToString(),
                        //    SecondOption = dataReader["secondOption"].ToString(),
                        //    ThirdOption = dataReader["thirdOption"].ToString(),
                        //    FourthOption = dataReader["FourthOption"].ToString(),
                        //    Required = Convert.ToBoolean(dataReader["fddbackDescription"])
                        //},
                        //personalInterests = new PersonalInterests
                        //{
                        //    InterestCode = Convert.ToInt32(dataReader["interestCode"]),
                        //    InterestDesc = dataReader["interestDesc"].ToString(),
                        //}
                    };
                }

                if (u != null)
                {
                    // Login successful
                    return u;
                }
                else
                {
                    // Login failed, return null or throw an exception as needed
                    return null;
                }
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand CreateLoginCommandWithStoredProcedure(String spName, SqlConnection con, User user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@inputEmail", user.Email);

            cmd.Parameters.AddWithValue("@inputPassword", user.Password);
            return cmd;
        }

        public void UpdateUserCurrentPlace(User user)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateUpdateUserCurrentPlaceCommand("SP_UpdateUserCurrentPlace", con, user); // create the command

            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        //---------------------------------------------------------------------------------
        // Create the SqlCommand for updating current place using a stored procedure
        //---------------------------------------------------------------------------------
        private SqlCommand CreateUpdateUserCurrentPlaceCommand(string spName, SqlConnection con, User user)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // stored procedure name

            cmd.CommandTimeout = 10;           // Time to wait for the execution, default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
            cmd.Parameters.AddWithValue("@email", user.Email);

            cmd.Parameters.AddWithValue("@firstName", user.FirstName);

            cmd.Parameters.AddWithValue("@lastName", user.LastName);

            cmd.Parameters.AddWithValue("@password", user.Password);

            cmd.Parameters.AddWithValue("@gender", user.Gender);

            string images = JsonSerializer.Serialize(user.Image);
            cmd.Parameters.AddWithValue("@image", images);

            cmd.Parameters.AddWithValue("@height", user.Height);

            cmd.Parameters.AddWithValue("@birthday", user.Birthday);

            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber);

            cmd.Parameters.AddWithValue("isActive", user.IsActive);

            cmd.Parameters.AddWithValue("@city", user.City);

            string PreferencesIdsS = JsonSerializer.Serialize(user.PreferencesIds);
            cmd.Parameters.AddWithValue("@preferencesIds", PreferencesIdsS);

            string PersonalInterestsIdsS = JsonSerializer.Serialize(user.PersonalInterestsIds);
            cmd.Parameters.AddWithValue("@personalInterestsIds", PersonalInterestsIdsS);

            cmd.Parameters.AddWithValue("@currentPlace", user.CurrentPlace);

            return cmd;
        }




        // Reading users by place
            


        public List<User> ReadUsersByPlace(int placeToLook)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> usersList = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateSelectUserByPlaceWithStoredProcedure("SP_ReadUsersByPlace", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User u = new User();
                    u.Email = dataReader["email"].ToString();
                    u.FirstName = dataReader["firstName"].ToString();
                    u.LastName = dataReader["lastName"].ToString();
                    u.Password = dataReader["password"].ToString();
                    u.Image = JsonSerializer.Deserialize<string[]>(dataReader["image"].ToString());
                    u.Gender = Convert.ToInt32(dataReader["gender"]);
                    u.Height = Convert.ToInt32(dataReader["height"]);
                    u.Birthday = Convert.ToDateTime(dataReader["birthday"]);
                    u.PhoneNumber = dataReader["phoneNumber"].ToString();
                    u.IsActive = Convert.ToBoolean(dataReader["isActive"]);
                    u.City = dataReader["city"].ToString();
                    u.PersonalInterestsIds = JsonSerializer.Deserialize<string[]>(dataReader["personalInterestsIds"].ToString());
                    u.PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString());
                    u.CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]); ;

                    //u.City = new City
                    //{
                    //    CityCode = Convert.ToInt32(dataReader["cityCode"]),
                    //    CityName = dataReader["cityName"].ToString()
                    //};
                    //u.Preference = new Preference
                    //{
                    //    PreferenceCode = Convert.ToInt32(dataReader["serialNumber"]),
                    //    PreferenceDescription = dataReader["fddbackDescription"].ToString(),
                    //    FirstOption = dataReader["firstOption"].ToString(),
                    //    SecondOption = dataReader["secondOption"].ToString(),
                    //    ThirdOption = dataReader["thirdOption"].ToString(),
                    //    FourthOption = dataReader["FourthOption"].ToString(),
                    //    Required = Convert.ToBoolean(dataReader["fddbackDescription"])
                    //};
                    //u.personalInterests = new PersonalInterests
                    //{
                    //    InterestCode = Convert.ToInt32(dataReader["interestCode"]),
                    //    InterestDesc = dataReader["interestDesc"].ToString(),
                    //};

                    if (Convert.ToInt32(dataReader["currentPlace"]) == placeToLook)
                    {
                        usersList.Add(u);
                    }

                }
                return usersList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //---------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure
        //---------------------------------------------------------------------------------
        private SqlCommand CreateSelectUserByPlaceWithStoredProcedure(String spName, SqlConnection con, int placeCode)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@currentPlace", placeCode);

            return cmd;
        }

    }
}
