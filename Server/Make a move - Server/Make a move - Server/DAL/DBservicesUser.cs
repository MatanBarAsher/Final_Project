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
        //--------------------------------------------------------------------------------------------------

        //public int InsertFlat(User user)
        //{

        //    SqlConnection con;
        //    SqlCommand cmd;

        //    try
        //    {
        //        // create the connection
        //        con = connect("myProjDB");
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }

        //    cmd = CreateUserInsertCommandWithStoredProcedure("SP_InsertNewUser", con, user);             // create the command

        //    try
        //    {
        //        // execute the command
        //        int numEffected = cmd.ExecuteNonQuery(); 
        //        return numEffected;
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }

        //    finally
        //    {
        //        if (con != null)
        //        {
        //            // close the db connection
        //            con.Close();
        //        }
        //    }

        //}

        ////---------------------------------------------------------------------------------
        //// Create the SqlCommand for insrting new user using a stored procedure
        ////---------------------------------------------------------------------------------

        //private SqlCommand CreateFlatInsertCommandWithStoredProcedure(String spName, SqlConnection con, User user)
        //{

        //    SqlCommand cmd = new SqlCommand(); // create the command object

        //    cmd.Connection = con;              // assign the connection to the command object

        //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //    cmd.Parameters.AddWithValue("@email", user.Email);

        //    cmd.Parameters.AddWithValue("@firstName", user.FirstName);

        //    cmd.Parameters.AddWithValue("@lastName", user.LastName );

        //    cmd.Parameters.AddWithValue("@password", user.Password);

        //    cmd.Parameters.AddWithValue("@gender", user.Gender);

        //    cmd.Parameters.AddWithValue("@image", user.Image );

        //    cmd.Parameters.AddWithValue("@height", user.Height );

        //    cmd.Parameters.AddWithValue("@birthday", user.Birthday );

        //    cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber );

        //    return cmd;
        //}


    }
}
