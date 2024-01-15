using Microsoft.EntityFrameworkCore;
using RozswietlSie.IServices;
using RozswietlSie.Models;

namespace RozswietlSie.Services
{
    public class MyAdminService : IMyAdminService
    {
        private readonly DBContext _dbContext;
        public MyAdminService(DBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public string Login(string username, string password)
        {
            var admin = _dbContext.MyAdmin.SingleOrDefault(u => u.UserName == username && u.Password == password);
            if (admin != null)
            {
                return admin.Role;
            }
            return null;
        }
    }
}

