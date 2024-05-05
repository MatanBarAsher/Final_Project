using Make_a_move___Server.DAL;
using System;
using System.Security.Cryptography.Xml;
namespace Make_a_move___Server.BL
{
    public class Preference
    {
        private int preferenceCode;
        private string preferenceDescription;
        private string firstOption;
        private string secondOption;
        private string thirdOption;
        private string fourthOption;
        private bool required;
        //private static List<Preference> preferencesList = new List<Preference>();

        public Preference() { }
        public Preference(int preferenceCode, string preferenceDescription, string firstOption, string secondOption, string thirdOption, string fourthOption, bool required)
        {
            this.preferenceCode = preferenceCode;
            this.preferenceDescription = preferenceDescription;
            this.firstOption = firstOption;
            this.secondOption = secondOption;
            this.thirdOption = thirdOption;
            this.fourthOption = fourthOption;
            this.required = required;
        }

        public int PreferenceCode { get => preferenceCode; set => preferenceCode = value; }
        public string PreferenceDescription { get => preferenceDescription; set => preferenceDescription = value; }
        public string FirstOption { get => firstOption; set => firstOption = value; }
        public string SecondOption { get => secondOption; set => secondOption = value; }
        public string ThirdOption { get => thirdOption; set => thirdOption = value; }
        public string FourthOption { get => fourthOption; set => fourthOption = value; }
        public bool Required { get => required; set => required = value; }

        public int InsertPreference()
        {
            try
            {
                DBservicesPreferences dbs = new DBservicesPreferences();
                preferencesList.Add(this);
                return dbs.InsertPreference(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting preference", ex);
            }
        }

        public List<Preference> ReadPreference()
        {
            try
            {
                DBservicesPreferences dbs = new DBservicesPreferences();
                return dbs.ReadPreference();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading preferences", ex);
            }
        }
    }
}
