using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class PersonalInterests
    {
        private int interestCode;
        private string interestDesc;
        private static List<PersonalInterests> personalInterestsList = new List<PersonalInterests>();

        public PersonalInterests() {  }
        public PersonalInterests(int interestCode, string interestDesc)
        {
            this.interestCode = interestCode;
            this.interestDesc = interestDesc;
        }

        public int InterestCode { get => interestCode; set => interestCode = value; }
        public string InterestDesc { get => interestDesc; set => interestDesc = value; }

        public int InsertPersonalInterests()
        {
            try
            {
                DBservicesPersonalInterests dbs = new DBservicesPersonalInterests();
                personalInterestsList.Add(this);
                return dbs.InsertPersonalInterests(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting personalInterests", ex);
            }
        }

        public List<PersonalInterests> ReadPersonalInterests()
        {
            try
            {
                DBservicesPersonalInterests dbs = new DBservicesPersonalInterests();
                return dbs.ReadPersonalInterests();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading personalInterests", ex);
            }
        }
    }
}
