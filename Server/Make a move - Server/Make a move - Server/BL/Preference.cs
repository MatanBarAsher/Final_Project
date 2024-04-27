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

        public Preference() { }
        public Preference(int preferenceCode, string preferenceDescription, string firstOption, string secondOption, string thirdOption, string fourthOption, bool required)
        {
            this.preferenceCode = preferenceCode;
            this.preferenceDescription = preferenceDescription;
            this.firstOption = firstOption;
            this.secontOption = secontOption;
            this.thirdOption = thirdOption;
            this.fourthdOption = fourthdOption;
            this.required = required;
        }

        public int PreferenceCode { get => preferenceCode; set => preferenceCode = value; }
        public string PreferenceDescription { get => preferenceDescription; set => preferenceDescription = value; }
        public string FirstOption { get => firstOption; set => firstOption = value; }
        public string secondOption { get => secondOption; set => secondOption = value; }
        public string ThirdOption { get => thirdOption; set => thirdOption = value; }
        public string FourthdOption { get => fourthOption; set => fourthOption = value; }
        public bool Required { get => required; set => required = value; }
    }
}
