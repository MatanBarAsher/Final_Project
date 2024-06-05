using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Make_a_move___Server.BL;
using Make_a_move___Server.Controllers;
using Make_a_move___Server.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistancesController : ControllerBase
    {
        private readonly DistanceService _distanceService;

        public DistancesController(DistanceService distanceService)
        {
            _distanceService = distanceService;
        }

        [HttpGet("getdata")]
        public async Task<ActionResult<ApiResponse>> GetData(int originCode, int destinationCode)
        {
            try
            {
                var apiResponse = await _distanceService.GetData(originCode, destinationCode);
                return Ok(apiResponse);
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}