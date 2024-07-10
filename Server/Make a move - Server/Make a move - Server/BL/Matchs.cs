using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class Match
    {
        private string userIds;
        private DateTime timeStamp;
        private int placeCode;
        private string feedback;
        private static List<Match> matchesList = new List<Match>();

        public Match() { }
        public Match(string userIds, DateTime timeStam, int serialNumber, int placeCode, string feedback)
        {
            this.userIds = userIds;
            this.timeStamp = timeStamp;
            this.placeCode = placeCode;
            this.feedback = feedback;
        }

        public string UserIds { get => userIds; set => userIds = value; }
        public DateTime TimeStamp { get => timeStamp; set => timeStamp = value; }
       // public bool IsMatch { get => isMatch; set => isMatch = value; }
        public string Feedback { get => feedback; set => feedback = value; }
        public int PlaceCode { get => placeCode; set => placeCode = value; }

        public Match(string userEmail, string likedUserEmail, int placeCode)
        {
            this.userIds = $"{userEmail}&{likedUserEmail}";
            this.timeStamp = DateTime.Now;
            this.feedback = "";
            this.placeCode = placeCode;  
        }

        public int InsertMatch()
        {
            try
            {
                DBservicesMatch dbs = new DBservicesMatch();
                matchesList.Add(this);
                return dbs.InsertMatch(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting match", ex);
            }
        }

        public List<Match> ReadMatches()
        {
            try
            {
                DBservicesMatch dbs = new DBservicesMatch();
                return dbs.ReadMatches();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading matches", ex);
            }
        }
    }
}
