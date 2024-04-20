namespace Make_a_move___Server.BL
{
    public class Admin
    {
        private int adminCode;
        private string adminName;


        public Admin() { }
        public Admin(int adminCode, string adminName)
        {
            this.adminCode = adminCode;
            this.adminName = adminName;
        }

        public int AdminCode { get => adminCode; set => adminCode = value; }
        public string AdminName { get => adminName; set => adminName = value; }
    }
}
