using System.Text.Json.Serialization;

namespace RozswietlSie.Models
{
    public class Product
    {
        public Product(int id, string name, float price, string description, string imageUrl, bool isAvailable = true) { 
            Id = id;
            Name = name;
            Price = price;
            Description = description;
            ImageUrl = imageUrl;
            IsAvailable = isAvailable;
            OrderItems = new List<OrderItem>();
        }
       
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public bool IsAvailable { get; set; } // 0 -niedostępny 1-dostępny 
        [JsonIgnore]
        public ICollection<OrderItem> OrderItems { get; set; }
    }

}
