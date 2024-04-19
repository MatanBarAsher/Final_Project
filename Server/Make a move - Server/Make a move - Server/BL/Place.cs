namespace Make_a_move___Server.BL
{
    public class Place
    {
        private int placeCode;
        private string name;
        private string adress;
        private string userIds;
        private DateTime timeStamp;

        public Place() { }

        public Place(int placeCode, string name, string adress, string userIds, DateTime timeStamp)
        {
            this.placeCode = placeCode;
            this.name = name;
            this.adress = adress;
            this.userIds = userIds;
            this.timeStamp = timeStamp;
        }

        public int PlaceCode { get => placeCode; set => placeCode = value; }
        public string Name { get => name; set => name = value; }
        public string Adress { get => adress; set => adress = value; }
        public string UserIds { get => userIds; set => userIds = value; }
        public DateTime TimeStamp { get => timeStamp; set => timeStamp = value; }
    }
}
