namespace Make_a_move___Server.BL
{
    public class TypeOfPlace
    {
        private int typeOfPlaceCode;
        private string typeOfPlaceDescription;

        public TypeOfPlace() { }
        public TypeOfPlace(int typeOfPlaceCode, string typeOfPlaceDescription)
        {
            this.typeOfPlaceCode = typeOfPlaceCode;
            this.typeOfPlaceDescription = typeOfPlaceDescription;
        }

        public int TypeOfPlaceCode { get => typeOfPlaceCode; set => typeOfPlaceCode = value; }
        public string TypeOfPlaceDescription { get => typeOfPlaceDescription; set => typeOfPlaceDescription = value; }
    }
}
