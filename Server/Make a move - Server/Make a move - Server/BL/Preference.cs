namespace Make_a_move___Server.BL
{
    public class Preference
    {
        private int preferenceCode;
        private string feedbackDescription;
        private string firstOption;
        private string secontOption;
        private string thirdOption;
        private string fourthdOption;
        private bool required;

        public Preference() { }
        public Preference(int preferenceCode, string feedbackDescription, string firstOption, string secontOption, string thirdOption, string fourthdOption, bool required)
        {
            this.preferenceCode = preferenceCode;
            this.feedbackDescription = feedbackDescription;
            this.firstOption = firstOption;
            this.secontOption = secontOption;
            this.thirdOption = thirdOption;
            this.fourthdOption = fourthdOption;
            this.required = required;
        }

        public int PreferenceCode { get => preferenceCode; set => preferenceCode = value; }
        public string FeedbackDescription { get => feedbackDescription; set => feedbackDescription = value; }
        public string FirstOption { get => firstOption; set => firstOption = value; }
        public string SecontOption { get => secontOption; set => secontOption = value; }
        public string ThirdOption { get => thirdOption; set => thirdOption = value; }
        public string FourthdOption { get => fourthdOption; set => fourthdOption = value; }
        public bool Required { get => required; set => required = value; }
    }
}
