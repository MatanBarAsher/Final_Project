using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class City
    {
        private int cityCode;
        private string cityName;
        private static List<City> citiesList = new List<City>();

        public City() { }
        public City(int cityCode, string cityName)
        {
            this.cityCode = cityCode;
            this.cityName = cityName;
        }

        public int CityCode { get => cityCode; set => cityCode = value; }
        public string CityName { get => cityName; set => cityName = value; }

        public int InsertCity()
        {
            try
            {
                DBservicesCity dbs = new DBservicesCity();
                citiesList.Add(this);
                return dbs.InsertCity(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting cities", ex);
            }
        }

        public List<City> ReadCities()
        {
            try
            {
                DBservicesCity dbs = new DBservicesCity();
                return dbs.ReadCities();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading cities", ex);
            }
        }
    }
}
