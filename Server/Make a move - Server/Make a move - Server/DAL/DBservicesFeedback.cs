using System.Data;
using System.Data.SqlClient;
using Make_a_move___Server.BL;

namespace Make_a_move___Server.DAL
{
    public class DBservicesFeedback
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
        // This method Inserts a feedback to the Feedback table 
        // --------------------------------------------------------------------------------------------------

        public int InsertFeedback(Feedback feedback)
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

            cmd = CreateFeedbackInsertCommandWithStoredProcedure("SP_InsertFeedback", con, feedback);  // create the command

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
        // Create the SqlCommand for insrting new feedback using a stored procedure
        //---------------------------------------------------------------------------------

        private SqlCommand CreateFeedbackInsertCommandWithStoredProcedure(String spName, SqlConnection con, Feedback feedback)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@serialNumber", feedback.SerialNumber);
            cmd.Parameters.AddWithValue("@feddbackDescription", feedback.FeddbackDescription);
            cmd.Parameters.AddWithValue("@firstOption", feedback.FirstOption);
            cmd.Parameters.AddWithValue("@secontOption", feedback.SecontOption);
            cmd.Parameters.AddWithValue("@thirdOption", feedback.ThirdOption);
            cmd.Parameters.AddWithValue("@fourthdOption", feedback.FourthdOption);
            cmd.Parameters.AddWithValue("@required", feedback.Required);

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // This method reads feedback from the database 
        //--------------------------------------------------------------------------------------------------
        public List<Feedback> ReadFeedback()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Feedback> feedbackList = new List<Feedback>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateSelectFeedbackWithStoredProcedure("SP_ReadFeedback", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Feedback f = new Feedback();
                    f.SerialNumber= Convert.ToInt32(dataReader["serialNumber"]);
                    f.FeddbackDescription = dataReader["fddbackDescription"].ToString();
                    f.FirstOption = dataReader["firstOption"].ToString();
                    f.SecontOption = dataReader["secontOption"].ToString();
                    f.ThirdOption = dataReader["thirdOption"].ToString();
                    f.FourthdOption = dataReader["FourthdOption"].ToString();
                    f.Required = Convert.ToBoolean(dataReader["fddbackDescription"]);
                    
    


                    feedbackList.Add(f);
                }
                return feedbackList;
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
        private SqlCommand CreateSelectFeedbackWithStoredProcedure(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // This method Updates a feedback at Feedback table 
        //--------------------------------------------------------------------------------------------------

        public Feedback UpdateFeedback(Feedback feedback)
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

            cmd = CreateFeedbackUpdateCommandWithStoredProcedure("SP_UpdateFeedback", con, feedback);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                Feedback f = null; // Initialize the Feedback object

                while (dataReader.Read())
                {
                    f = new Feedback            
                    {
                    SerialNumber = Convert.ToInt32(dataReader["serialNumber"]),
                    FeddbackDescription = dataReader["fddbackDescription"].ToString(),
                    FirstOption = dataReader["firstOption"].ToString(),
                    SecontOption = dataReader["secontOption"].ToString(),
                    ThirdOption = dataReader["thirdOption"].ToString(),
                    FourthdOption = dataReader["FourthdOption"].ToString(),
                    Required = Convert.ToBoolean(dataReader["fddbackDescription"])

                };
                }

                if (f != null)
                {
                    // Login successful
                    return f;
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
        private SqlCommand CreateFeedbackUpdateCommandWithStoredProcedure(String spName, SqlConnection con, Feedback feedback)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@serialNumber", feedback.SerialNumber);
            cmd.Parameters.AddWithValue("@feddbackDescription", feedback.FeddbackDescription);
            cmd.Parameters.AddWithValue("@firstOption", feedback.FirstOption);
            cmd.Parameters.AddWithValue("@secontOption", feedback.SecontOption);
            cmd.Parameters.AddWithValue("@thirdOption", feedback.ThirdOption);
            cmd.Parameters.AddWithValue("@fourthdOption", feedback.FourthdOption);
            cmd.Parameters.AddWithValue("@required", feedback.Required);


            return cmd;
        }





    }
}
