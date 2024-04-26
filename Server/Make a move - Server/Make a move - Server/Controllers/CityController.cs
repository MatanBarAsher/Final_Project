using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        // GET: api/<CityController>
        [HttpGet]
        public List<City> ReadCities()
        {
            City city = new City();
            return city.ReadCities();
        }


        // POST api/<CityController>
        [HttpPost]
        public int Post([FromBody] City city)
        {
            return city.InsertCity();
        }

    }
}
