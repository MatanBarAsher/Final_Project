namespace Make_a_move___Server.Services
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Make_a_move___Server.BL;
    using Newtonsoft.Json;

    public class DistanceService
    {
        private readonly HttpClient _httpClient;

        public DistanceService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ApiResponse> GetData(int originCode, int destinationCode)
        {
            var url = $"https://data.gov.il/api/3/action/datastore_search?resource_id=bc5293d3-1023-4d9e-bdbe-082b58f93b65&filters={{\"קוד מוצא\":{originCode},\"קוד יעד\":{destinationCode}}}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode}: {response.ReasonPhrase}");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var apiResponse = JsonConvert.DeserializeObject<ApiResponse>(jsonResponse);

            if (apiResponse.success && apiResponse.result != null)
            {
                return apiResponse;
            }

            throw new Exception("Failed to fetch data");
        }
    }

}
