using Microsoft.EntityFrameworkCore;
using RozswietlSie;
using RozswietlSie.IServices;
using Zaj�cia2_MVC.IRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IProductService, ProductService>();
var conntectionString = builder
    .Configuration
    .GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DBContext>(opt =>
{
    opt.UseSqlServer(conntectionString);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
