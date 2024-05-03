using Make_a_move___Server.BL;
using System.Data;
using System.Data.SqlClient;


namespace Make_a_move___Server.DAL
{
    public class DBservicesMatch
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
        // This method Inserts a Match to the Matches table 
        // --------------------------------------------------------------------------------------------------

        public int InsertMatch(Match match)
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

            cmd = CreateMatchInsertCommandWithStoredProcedure("SP_InsertNewMatch", con, match);  // create the command

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
        // Create the SqlCommand for insrting new match using a stored procedure
        //---------------------------------------------------------------------------------

        private SqlCommand CreateMatchInsertCommandWithStoredProcedure(String spName, SqlConnection con, Match match)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userIds", match.UserIds);

            cmd.Parameters.AddWithValue("@isMatch", match.IsMatch);

            cmd.Parameters.AddWithValue("@feedback", match.Feedback);


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // This method reads matches from the database 
        //--------------------------------------------------------------------------------------------------
        public List<Match> ReadMatches()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Match> matchesList = new List<Match>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateSelectMatchWithStoredProcedure("SP_ReadMatches", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                   Match m = new Match();
                    m.UserIds = dataReader["userIds"].ToString();
                    m.IsMatch = Convert.ToBoolean(dataReader["isMatch"]);
                    m.Feedback = new Feedback
                    {
                        SerialNumber = Convert.ToInt32(dataReader["serialNumber"]),
                        FeddbackDescription = dataReader["fddbackDescription"].ToString(),
                        FirstOption = dataReader["firstOption"].ToString(),
                        SecontOption = dataReader["secontOption"].ToString(),
                        ThirdOption = dataReader["thirdOption"].ToString(),
                        FourthdOption = dataReader["FourthdOption"].ToString(),
                        Required = Convert.ToBoolean(dataReader["fddbackDescription"])
                    };
                    matchesList.Add(m);
                }
                return matchesList;
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
        private SqlCommand CreateSelectMatchWithStoredProcedure(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        ////--------------------------------------------------------------------------------------------------
        //// This method Updates a city at Cities table 
        ////--------------------------------------------------------------------------------------------------

        //public City UpdateCity(City city)
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

        //    cmd = CreateCityUpdateCommandWithStoredProcedure("SP_UpdateCity", con, city);             // create the command

        //    try
        //    {
        //        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        //        City c = null; // Initialize the City object

        //        while (dataReader.Read())
        //        {
        //            c = new City
        //            {
        //                CityCode = Convert.ToInt32(dataReader["cityCode"]),
        //                CityName = dataReader["cityName"].ToString(),

        //            };
        //        }

        //        if (c != null)
        //        {
        //            // Login successful
        //            return c;
        //        }
        //        else
        //        {
        //            // Login failed, return null or throw an exception as needed
        //            return null;
        //        }
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
        //// Create the SqlCommand using a stored procedure
        ////---------------------------------------------------------------------------------
        ////---------------------------------------------------------------------------------
        //private SqlCommand CreateCityUpdateCommandWithStoredProcedure(String spName, SqlConnection con, City city)
        //{

        //    SqlCommand cmd = new SqlCommand(); // create the command object

        //    cmd.Connection = con;              // assign the connection to the command object

        //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //    cmd.Parameters.AddWithValue("@cityCode", city.CityCode);

        //    cmd.Parameters.AddWithValue("@cityName", city.CityName);



        //    return cmd;
        //}







    }


} 


