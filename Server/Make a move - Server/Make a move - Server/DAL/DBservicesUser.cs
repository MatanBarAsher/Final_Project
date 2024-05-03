using System.Data;
using System.Data.SqlClient;
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

            cmd.Parameters.AddWithValue("@image", user.Image);

            cmd.Parameters.AddWithValue("@height", user.Height);

            cmd.Parameters.AddWithValue("@birthday", user.Birthday);

            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber);

            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber);

            cmd.Parameters.AddWithValue("@city", user.City);

            cmd.Parameters.AddWithValue("@preference", user.Preference);

            cmd.Parameters.AddWithValue("@personalInterests", user.personalInterest);
            // Neta: need to check why user.PersonalInterest is not defined

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
                    //u.Image = dataReader["image"].ToString();
                    u.Gender = Convert.ToInt32(dataReader["gender"]);
                    u.Height = Convert.ToInt32(dataReader["height"]);
                    u.Birthday = Convert.ToDateTime(dataReader["birthday"]);
                    u.PhoneNumber = dataReader["phoneNumber"].ToString();
                    u.IsActive = Convert.ToBoolean(dataReader["isActive"]);
                    //u.City = dataReader["city"].ToString();
                    //u.Preference = dataReader["preference"].ToString();
                    //u.PersonalInterests = dataReader["personalInterests"].ToString();
                    //image&preferences&personal - defined as string[] and not string / casting?


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
                        //Image = dataReader["image"].ToString(),
                        Gender = Convert.ToInt32(dataReader["gender"]),
                        Height = Convert.ToInt32(dataReader["height"]),
                        Birthday = Convert.ToDateTime(dataReader["birthday"]),
                        PhoneNumber = dataReader["phoneNumber"].ToString(),
                        IsActive = Convert.ToBoolean(dataReader["isActive"]),
                        //City = dataReader["city"].ToString(),
                        //Preference = dataReader["preference"].ToString(),
                        //personalInterests = dataReader["personalInterests"].ToString()
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

            cmd.Parameters.AddWithValue("@image", user.Image);

            cmd.Parameters.AddWithValue("@height", user.Height);

            cmd.Parameters.AddWithValue("@birthday", user.Birthday);

            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber);

            cmd.Parameters.AddWithValue("@city", user.City);

            cmd.Parameters.AddWithValue("@preference", user.Preference);

            cmd.Parameters.AddWithValue("@personalInterests", user.personalInterest);


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
                        //Image = dataReader["image"].ToString(),
                        Gender = Convert.ToInt32(dataReader["gender"]),
                        Height = Convert.ToInt32(dataReader["height"]),
                        Birthday = Convert.ToDateTime(dataReader["birthday"]),
                        PhoneNumber = dataReader["phoneNumber"].ToString(),
                        IsActive = Convert.ToBoolean(dataReader["isActive"]),
                        //City = dataReader["city"].ToString(),
                        //Preference = dataReader["preference"].ToString(),
                        //personalInterests = dataReader["personalInterests"].ToString()
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





    }
}
