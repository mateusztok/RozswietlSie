using Microsoft.EntityFrameworkCore;
using RozswietlSie.Models;


namespace RozswietlSie
{
    public class DBContext: DbContext
        {
            public DBContext(DbContextOptions<DBContext> options)
                : base(options)
            {

            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {

                modelBuilder.Entity<Product>()
                    .HasKey(x => x.Id);
                modelBuilder.Entity<Order>()
                    .HasKey(x => x.Id);
                modelBuilder.Entity<Order>()
                    .Property(x => x.OrderTotal)
                    .HasColumnType("decimal(18, 2)");
                modelBuilder.Entity<Product>()
                    .Property(p => p.Price)
                    .HasColumnType("decimal(18, 2)");
                modelBuilder.Entity<OrderItem>()
                    .HasKey(x => x.Id);
                modelBuilder.Entity<Product>()
                    .HasMany(x => x.OrderItems)
                    .WithOne(x => x.Product)
                    .HasForeignKey(x => x.ProductId);
                modelBuilder.Entity<Order>()
                    .HasMany(x => x.OrderItems)
                    .WithOne(x => x.Order)
                    .HasForeignKey(x => x.OrderId);
            }

            public DbSet<Product> Products { get; set; }
            public DbSet<Order> Orders { get; set; }
            public DbSet<OrderItem> OrderDetails { get; set; }
        }
    }

  
