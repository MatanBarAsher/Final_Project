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

        public City UpdateCity(City newCity)
        {
            try
            {
                // Find the user in the UsersList by email
                City cityToUpdate = citiesList.Find(c => string.Equals(c.CityName.Trim(), newCity.CityName.Trim(), StringComparison.OrdinalIgnoreCase));

                if (cityToUpdate != null)
                {
                    // Update City information
                    cityToUpdate.CityCode = newCity.CityCode;
                    cityToUpdate.CityName = newCity.CityName;



                    // Update in the database (assuming DBservices has an UpdateCity method)
                    DBservicesCity dbs = new DBservicesCity();
                    return dbs.UpdateCity(cityToUpdate);
                }
                else
                {
                    // City not found, handle the case appropriately (return null, throw an exception, etc.)
                    return null; // Or throw new Exception("City not found");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error updating City", ex);
            }
        }
    }
}
