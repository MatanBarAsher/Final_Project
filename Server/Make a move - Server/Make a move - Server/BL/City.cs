namespace Make_a_move___Server.BL
{
    public class City
    {
        private int cityCode;
        private string cityName;

        public City() { }
        public City(int cityCode, string cityName)
        {
            this.cityCode = cityCode;
            this.cityName = cityName;
        }

        public int CityCode { get => cityCode; set => cityCode = value; }
        public string CityName { get => cityName; set => cityName = value; }
    }
}
