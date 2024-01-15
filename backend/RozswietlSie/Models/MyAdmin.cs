using System.Security.Principal;
using System;
using Microsoft.AspNetCore.Identity;

namespace RozswietlSie.Models
{
    public class MyAdmin
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }   
    }
}
