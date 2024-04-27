using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class TypeOfPlace
    {
        private int typeOfPlaceCode;
        private string typeOfPlaceDescription;
        private static List<TypeOfPlace> typeOfPlaceList = new List<TypeOfPlace>();

        public TypeOfPlace() { }
        public TypeOfPlace(int typeOfPlaceCode, string typeOfPlaceDescription)
        {
            this.typeOfPlaceCode = typeOfPlaceCode;
            this.typeOfPlaceDescription = typeOfPlaceDescription;
        }

        public int TypeOfPlaceCode { get => typeOfPlaceCode; set => typeOfPlaceCode = value; }
        public string TypeOfPlaceDescription { get => typeOfPlaceDescription; set => typeOfPlaceDescription = value; }

        public int InsertTypeOfPlace()
        {
            try
            {
                DBservicesTypeOfPlace dbs = new DBservicesTypeOfPlace();
                typeOfPlaceList.Add(this);
                return dbs.InsertTypeOfPlace(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting typeOfPlace", ex);
            }
        }

        public List<TypeOfPlace> ReadTypeOfPlace()
        {
            try
            {
                DBservicesTypeOfPlace dbs = new DBservicesTypeOfPlace();
                return dbs.ReadTypeOfPlace();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading typeOfPlace", ex);
            }
        }
    }
}
