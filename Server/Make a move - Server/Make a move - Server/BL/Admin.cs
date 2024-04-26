using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class Admin
    {
        private int adminCode;
        private string adminName;
        private static List<Admin> adminsList = new List<Admin>();

        public Admin() { }
        public Admin(int adminCode, string adminName)
        {
            this.adminCode = adminCode;
            this.adminName = adminName;
           
    }

        public int AdminCode { get => adminCode; set => adminCode = value; }
        public string AdminName { get => adminName; set => adminName = value; }

        public int InsertAdmin()
        {
            try
            {
                DBservicesAdmin dbs = new DBservicesAdmin();
                adminsList.Add(this);
                return dbs.InsertAdmin(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting admin", ex);
            }
        }

        public List<Admin> ReadAdmins()
        {
            try
            {
                DBservicesAdmin dbs = new DBservicesAdmin();
                return dbs.ReadAdmin();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading admins", ex);
            }
        }
    }
}
