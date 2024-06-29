//using System.Data;
//using System.Data.SqlClient;
//using System.Security.Cryptography.Xml;
//using Make_a_move___Server.BL;

//namespace Make_a_move___Server.DAL
//{
//    public class DBservicesPreferences
//    {
//        public SqlConnection connect(String conString)
//        {
//            IConfigurationRoot configuration = new ConfigurationBuilder()
//            .AddJsonFile("appsettings.json").Build();
//            string cStr = configuration.GetConnectionString("myProjDB");
//            SqlConnection con = new SqlConnection(cStr);
//            con.Open();
//            return con;
//        }


//        //--------------------------------------------------------------------------------------------------
//        // This method Inserts a preferences to the Preferences table 
//        // --------------------------------------------------------------------------------------------------

//        public int InsertPreference(Preference preference)
//        {

//            SqlConnection con;
//            SqlCommand cmd;

//            try
//            {
//                // create the connection
//                con = connect("myProjDB");
//            }
//            catch (Exception ex)
//            {
//                // write to log
//                throw (ex);
//            }

//            cmd = CreatePreferenceInsertCommandWithStoredProcedure("SP_InsertNewPreference", con, preference);  // create the command

//            try
//            {
//                // execute the command
//                int numEffected = cmd.ExecuteNonQuery();
//                return numEffected;
//            }
//            catch (Exception ex)
//            {
//                // write to log
//                throw (ex);
//            }

//            finally
//            {
//                if (con != null)
//                {
//                    // close the db connection
//                    con.Close();
//                }
//            }

//        }

//        //---------------------------------------------------------------------------------
//        // Create the SqlCommand for insrting new preferences using a stored procedure
//        //---------------------------------------------------------------------------------

//        private SqlCommand CreatePreferenceInsertCommandWithStoredProcedure(String spName, SqlConnection con, Preference preference)
//        {

//            SqlCommand cmd = new SqlCommand(); // create the command object

//            cmd.Connection = con;              // assign the connection to the command object

//            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

//            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

//            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

//            cmd.Parameters.AddWithValue("@preferenceCode", preference.PreferenceCode);
//            cmd.Parameters.AddWithValue("@preferenceDescription", preference.PreferenceDescription);
//            //cmd.Parameters.AddWithValue("@firstOption", preference.FirstOption);
//            //cmd.Parameters.AddWithValue("@secondOption", preference.SecondOption);
//            //cmd.Parameters.AddWithValue("@thirdOption", preference.ThirdOption);
//            //cmd.Parameters.AddWithValue("@fourthOption", preference.FourthOption);
//            //cmd.Parameters.AddWithValue("@required", preference.Required);

//            return cmd;
//        }

//        //--------------------------------------------------------------------------------------------------
//        // This method reads preference from the database 
//        //--------------------------------------------------------------------------------------------------
//        public List<Preference> ReadPreference()
//        {

//            SqlConnection con;
//            SqlCommand cmd;
//            List<Preference> preferenceList = new List<Preference>();

//            try
//            {
//                con = connect("myProjDB"); // create the connection
//            }
//            catch (Exception ex)
//            {
//                // write to log
//                throw (ex);
//            }

//            cmd = CreateSelectPreferenceListWithStoredProcedure("SP_ReadPreferences", con);             // create the command

//            try
//            {
//                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

//                while (dataReader.Read())
//                {
//                    Preference p = new Preference();
//                    p.PreferenceCode = Convert.ToInt32(dataReader["preferenceCode"]);
//                    p.PreferenceDescription = dataReader["preferenceDescription"].ToString();
//                    //p.FirstOption = dataReader["firstOption"].ToString();
//                    //p.SecondOption = dataReader["secondOption"].ToString();
//                    //p.ThirdOption = dataReader["thirdOption"].ToString();
//                    //p.FourthOption = dataReader["fourthOption"].ToString();
//                    //p.Required = Convert.ToBoolean(dataReader["required"]);




//                    preferenceList.Add(p);
//                }
//                return preferenceList;
//            }
//            catch (Exception ex)
//            {
//                // write to log
//                throw (ex);
//            }

//            finally
//            {
//                if (con != null)
//                {
//                    // close the db connection
//                    con.Close();
//                }
//            }

//        }
//        //---------------------------------------------------------------------------------
//        // Create the SqlCommand using a stored procedure
//        //---------------------------------------------------------------------------------
//        private SqlCommand CreateSelectPreferenceListWithStoredProcedure(String spName, SqlConnection con)
//        {

//            SqlCommand cmd = new SqlCommand(); // create the command object

//            cmd.Connection = con;              // assign the connection to the command object

//            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

//            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

//            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

//            return cmd;
//        }

//        //--------------------------------------------------------------------------------------------------
//        // This method Updates a preference at Preference table 
//        //--------------------------------------------------------------------------------------------------

//        public Preference UpdatePreference(Preference preference)
//        {
//            SqlConnection con;
//            SqlCommand cmd;

//            try
//            {
//                con = connect("myProjDB"); // create the connection
//            }
//            catch (Exception ex)
//            {
//                // write to log
//                throw (ex);
//            }

//            cmd = CreateprefrefernceUpdateCommandWithStoredProcedure("SP_UpdatePreference", con, preference);             // create the command

//            try
//            {
//                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

//                Preference p = null; // Initialize the Feedback object

//                while (dataReader.Read())
//                {
//                    p = new Preference
//                    {
//                        PreferenceCode = Convert.ToInt32(dataReader["serialNumber"]),
//                        PreferenceDescription = dataReader["preferenceDescription"].ToString(),
//                        //FirstOption = dataReader["firstOption"].ToString(),
//                        //SecondOption = dataReader["secondOption"].ToString(),
//                        //ThirdOption = dataReader["thirdOption"].ToString(),
//                        //FourthOption = dataReader["FourthOption"].ToString(),
//                        //Required = Convert.ToBoolean(dataReader["required"])

//                    };
//                }

//                if (p != null)
//                {
//                    // Login successful
//                    return p;
//                }
//                else
//                {
//                    // Login failed, return null or throw an exception as needed
//                    return null;
//                }
//            }
//            catch (Exception ex)
//            {
//                // write to log
//                throw (ex);
//            }

//            finally
//            {
//                if (con != null)
//                {
//                    // close the db connection
//                    con.Close();
//                }
//            }

//        }

//        //---------------------------------------------------------------------------------
//        // Create the SqlCommand using a stored procedure
//        //---------------------------------------------------------------------------------
//        //---------------------------------------------------------------------------------
//        private SqlCommand CreateprefrefernceUpdateCommandWithStoredProcedure(String spName, SqlConnection con, Preference preference)
//        {

//            SqlCommand cmd = new SqlCommand(); // create the command object

//            cmd.Connection = con;              // assign the connection to the command object

//            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

//            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

//            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

//            cmd.Parameters.AddWithValue("@preferenceCode", preference.PreferenceCode);
//            cmd.Parameters.AddWithValue("@preferenceDescription", preference.PreferenceDescription);
//            //cmd.Parameters.AddWithValue("@firstOption", preference.FirstOption);
//            //cmd.Parameters.AddWithValue("@secondOption", preference.SecondOption);
//            //cmd.Parameters.AddWithValue("@thirdOption", preference.ThirdOption);
//            //cmd.Parameters.AddWithValue("@fourthOption", preference.FourthOption);
//            //cmd.Parameters.AddWithValue("@required", preference.Required);


//            return cmd;
//        }





//    }
//}
