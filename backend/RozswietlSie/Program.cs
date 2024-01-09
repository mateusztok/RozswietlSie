using Microsoft.EntityFrameworkCore;
using RozswietlSie;
using RozswietlSie.IServices;
using RozswietlSie.Services;
using Zajêcia2_MVC.IRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddSession();
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
    options.AddPolicy("Default", builder =>
    {
        builder.WithOrigins("*")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSession();
app.UseCors("Default");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
