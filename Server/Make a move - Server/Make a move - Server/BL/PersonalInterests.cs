namespace Make_a_move___Server.BL
{
    public class PersonalInterests
    {
        private int interestCode;
        private string interestDesc;

        public PersonalInterests() {  }
        public PersonalInterests(int interestCode, string interestDesc)
        {
            this.interestCode = interestCode;
            this.interestDesc = interestDesc;
        }

        public int InterestCode { get => interestCode; set => interestCode = value; }
        public string InterestDesc { get => interestDesc; set => interestDesc = value; }
    }
}
