namespace Make_a_move___Server.BL
{
    public class Match
    {
        private string userIds;
        private DateTime timeStamp;
        private bool isMatch;
        private int serialNumber;

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
    }
}
