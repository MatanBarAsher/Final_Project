﻿namespace Make_a_move___Server.BL
{
    public class Feedback
    {
        private int serialNumber;
        private string feedbackDescription;
        private string firstOption;
        private string secontOption;
        private string thirdOption;
        private string fourthdOption;
        private bool required;

        public Feedback() { }

        public Feedback(int serialNumber, string feddbackDescription, string firstOption, string secontOption, string thirdOption, string fourthdOption, bool required)
        {
            this.serialNumber = serialNumber;
            this.feedbackDescription = feddbackDescription;
            this.firstOption = firstOption;
            this.secontOption = secontOption;
            this.thirdOption = thirdOption;
            this.fourthdOption = fourthdOption;
            this.required = required;
        }

        public int SerialNumber { get => serialNumber; set => serialNumber = value; }
        public string FeddbackDescription { get => feedbackDescription; set => feedbackDescription = value; }
        public string FirstOption { get => firstOption; set => firstOption = value; }
        public string SecontOption { get => secontOption; set => secontOption = value; }
        public string ThirdOption { get => thirdOption; set => thirdOption = value; }
        public string FourthdOption { get => fourthdOption; set => fourthdOption = value; }
        public bool Required { get => required; set => required = value; }
    }
}
