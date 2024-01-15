using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RozswietlSie;
using RozswietlSie.IServices;
using RozswietlSie.Models;
using RozswietlSie.Services;
using Microsoft.Extensions.DependencyInjection;
using Zajêcia2_MVC.IRepository;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IMyAdminService, MyAdminService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20); 
    options.Cookie.HttpOnly = false; 
    options.Cookie.IsEssential = true; 
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;


});
var conntectionString = builder
    .Configuration
    .GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DBContext>(opt =>
{
    opt.UseSqlServer(conntectionString);
});

builder.Services.AddDistributedMemoryCache();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAny", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
        .AllowCredentials(); 
    });

});


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAny");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.UseSession();
app.MapControllers();

app.Run();

