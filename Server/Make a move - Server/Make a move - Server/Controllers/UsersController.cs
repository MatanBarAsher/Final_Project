﻿using Make_a_move___Server.BL;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Make_a_move___Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public List<User> ReadUsers()
        {
            User user = new User();
            return user.ReadUsers();
        }

        // POST api/<UsersController>
        [HttpPost]
        public int Post([FromBody] User user)
        {
            return user.InsertUser();
        }

        [HttpPost("Login")]
        public String CheckLogin([FromBody] String password)
        {
            return password;//user.CheckLogin();
        }

        [HttpPut("Update")]
        public User Update( [FromBody] User user)
        {
            return user.UpdateUser(user);
        }

        [HttpGet("Report/{placeCode}")]
        public List<User> ReadUsersByPlace([FromRoute] string placeCode)
        {
            int p = Convert.ToInt32(placeCode);
            User user = new User();
            return user.ReadUsersByPlace(p);
        }
        [HttpPut("UpdatePlace")]
        public User UpdateUserCurrentPlace([FromBody] User user)
        {
            return user.UpdateUserCurrentPlace(user);
        }


    }
}
