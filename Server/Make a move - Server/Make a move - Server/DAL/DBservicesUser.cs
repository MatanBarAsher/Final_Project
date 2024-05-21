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
            
            //string PreferencesIdsS = JsonSerializer.Serialize(user.PreferencesIds);
            //cmd.Parameters.AddWithValue("@preferencesIds", PreferencesIdsS);
            
            string PreferencesDictionary = JsonSerializer.Serialize(user.PreferencesDictionary);
            cmd.Parameters.AddWithValue("@preferencesIds", PreferencesDictionary);

            string PersonalInterestsIdsS = JsonSerializer.Serialize(user.PersonalInterestsIds);
            cmd.Parameters.AddWithValue("@personalInterestsIds", PersonalInterestsIdsS);

            cmd.Parameters.AddWithValue("@currentPlace", user.CurrentPlace);

            cmd.Parameters.AddWithValue("@persoalText", user.PersoalText);
            



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
                    //u.PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString());
                    u.PreferencesDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(dataReader["preferencesIds"].ToString());
                    u.CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]);
                    u.PersoalText = dataReader["persoalText"].ToString();
                    

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
                        Gender = Convert.ToInt32(dataReader["gender"]),
                        Height = Convert.ToInt32(dataReader["height"]),
                        Birthday = Convert.ToDateTime(dataReader["birthday"]),
                        PhoneNumber = dataReader["phoneNumber"].ToString(),
                        IsActive = Convert.ToBoolean(dataReader["isActive"]),
                        City = dataReader["city"].ToString(),
                        PersonalInterestsIds = JsonSerializer.Deserialize<string[]>(dataReader["personalInterestsIds"].ToString()),
                        //PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString()),
                        PreferencesDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(dataReader["preferencesIds"].ToString()),
                        CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]),
                        PersoalText= dataReader["persoalText"].ToString(),
                        
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

            //string PreferencesIdsS = JsonSerializer.Serialize(user.PreferencesIds);
            //cmd.Parameters.AddWithValue("@preferencesIds", PreferencesIdsS);

            string PreferencesDictionary = JsonSerializer.Serialize(user.PreferencesDictionary);
            cmd.Parameters.AddWithValue("@preferencesIds", PreferencesDictionary);

            string PersonalInterestsIdsS = JsonSerializer.Serialize(user.PersonalInterestsIds);
            cmd.Parameters.AddWithValue("@personalInterestsIds", PersonalInterestsIdsS);

            cmd.Parameters.AddWithValue("@currentPlace", user.CurrentPlace);

            cmd.Parameters.AddWithValue("@persoalText", user.PersoalText);

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
                        LastName = dataReader["lastName"].ToString(),
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
                        //PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString()),
                        PreferencesDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(dataReader["preferencesIds"].ToString()),
                        CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]),
                        PersoalText = dataReader["persoalText"].ToString(),

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

           // string PreferencesIdsS = JsonSerializer.Serialize(user.PreferencesIds);
            //cmd.Parameters.AddWithValue("@preferencesIds", PreferencesIdsS);

            string PreferencesDictionary = JsonSerializer.Serialize(user.PreferencesDictionary);
            cmd.Parameters.AddWithValue("@preferencesIds", PreferencesDictionary);

            string PersonalInterestsIdsS = JsonSerializer.Serialize(user.PersonalInterestsIds);
            cmd.Parameters.AddWithValue("@personalInterestsIds", PersonalInterestsIdsS);

            cmd.Parameters.AddWithValue("@currentPlace", user.CurrentPlace);

            cmd.Parameters.AddWithValue("@persoalText", user.PersoalText);


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

            cmd = CreateSelectUserByPlaceWithStoredProcedure("SP_ReadUsersByPlace", con, placeToLook);             // create the command

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
                   // u.PreferencesIds = JsonSerializer.Deserialize<string[]>(dataReader["preferencesIds"].ToString());
                    u.PreferencesDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(dataReader["preferencesIds"].ToString());
                    u.CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]); ;
                    u.PersoalText = dataReader["persoalText"].ToString();



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





        public User GetUserByEmail(string email)
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

            cmd = CreateSelectUserByEmailCommand("SP_GetUserByEmail", con, email); // create the command

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
                        LastName = dataReader["lastName"].ToString(),
                        Password = dataReader["password"].ToString(),
                        Image = JsonSerializer.Deserialize<string[]>(dataReader["image"].ToString()),
                        Gender = Convert.ToInt32(dataReader["gender"]),
                        Height = Convert.ToInt32(dataReader["height"]),
                        Birthday = Convert.ToDateTime(dataReader["birthday"]),
                        PhoneNumber = dataReader["phoneNumber"].ToString(),
                        IsActive = Convert.ToBoolean(dataReader["isActive"]),
                        City = dataReader["city"].ToString(),
                        PersonalInterestsIds = JsonSerializer.Deserialize<string[]>(dataReader["personalInterestsIds"].ToString()),
                        PreferencesDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(dataReader["preferencesIds"].ToString()),
                        CurrentPlace = Convert.ToInt32(dataReader["currentPlace"]),
                        PersoalText = dataReader["persoalText"].ToString(),



                    };
                }

                return u;
            }
            catch (SqlException ex)
            {
                // Log the SQL exception
                Console.WriteLine("SQL Exception:");
                Console.WriteLine($"Error Number: {ex.Number}");
                Console.WriteLine($"Message: {ex.Message}");
                // Additional error handling logic...

                // Rethrow the exception or return null
                throw; // Rethrow the exception to propagate it to the caller
            }
            // catch (Exception ex)
            // {
            //     // Log other types of exceptions
            //     Console.WriteLine($"An error occurred: {ex.Message}");
            //     // Additional error handling logic...

            //     // Rethrow the exception or return null
            //     throw; // Rethrow the exception to propagate it to the caller
            // }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }


        }

        private SqlCommand CreateSelectUserByEmailCommand(String spName, SqlConnection con, string email)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@inputEmail", email); // Add parameter for email

            return cmd;
        }

            public int ChangeUserImages(string email, string[] images)
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

            cmd = CreateChangeUserImagesCommandWithStoredProcedure("SP_ChangeUserImages", con, email, images); // Create the command

            try
            {
                //Execute the command
                int numEffected = cmd.ExecuteNonQuery();
                return numEffected;
            }
            catch (Exception ex)
            {
                // Write to log
                throw ex;
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
        //private SqlCommand CreateSelectUserByEmailCommand(String spName, SqlConnection con, string email)
        //{

        //    SqlCommand cmd = new SqlCommand(); // create the command object

        //    cmd.Connection = con;              // assign the connection to the command object

        //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //    cmd.Parameters.AddWithValue("@inputEmail", email); // Add parameter for email

        //    return cmd;

        //}



        //public int ChangeUserImages(string email, string[] images)
        //{
        //    SqlConnection con;
        //    SqlCommand cmd;

        //    try
        //    {
        //        con = connect("myProjDB"); // create the connection
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }

        //    cmd = CreateChangeUserImagesCommandWithStoredProcedure("SP_ChangeUserImages", con, email, images); // Create the command

        //        try
        //        {
        //            //Execute the command
        //            int numEffected = cmd.ExecuteNonQuery();
        //            return numEffected;
        //        }
        //        catch (Exception ex)
        //        {
        //            // Write to log
        //            throw ex;
        //        }
        //        finally
        //        {
        //            if (con != null)
        //            {
        //                // close the db connection
        //                con.Close();
        //            }
        //        }
        //}

       
            
        //---------------------------------------------------------------------------------
        // Create the SqlCommand for changing user images using a stored procedure
        //---------------------------------------------------------------------------------

        private SqlCommand CreateChangeUserImagesCommandWithStoredProcedure(String spName, SqlConnection con, string email, string[] images)
        {
            SqlCommand cmd = new SqlCommand(); // Create the command object

            cmd.Connection = con; // Assign the connection to the command object

            cmd.CommandText = spName; // Can be Select, Insert, Update, Delete

            cmd.CommandTimeout = 10; // Time to wait for the execution. The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // The type of the command, can also be text

            cmd.Parameters.AddWithValue("@email", email);

            string imagesJson = JsonSerializer.Serialize(images);
            cmd.Parameters.AddWithValue("@images", imagesJson);

            return cmd;
        }



    }
}
