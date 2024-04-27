using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class Match
    {
        private string userIds;
        private DateTime timeStamp;
        private bool isMatch;
        private int serialNumber;
        private static List<Match> matchesList = new List<Match>();

        public Match() { }
        public Match(string userIds, DateTime timeStamp, bool isMatch, int serialNumber)
        {
            this.userIds = userIds;
            this.timeStamp = timeStamp;
            this.isMatch = isMatch;
            this.serialNumber = serialNumber;
        }

        public string UserIds { get => userIds; set => userIds = value; }
        public DateTime TimeStamp { get => timeStamp; set => timeStamp = value; }
        public bool IsMatch { get => isMatch; set => isMatch = value; }
        public int SerialNumber { get => serialNumber; set => serialNumber = value; }

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
