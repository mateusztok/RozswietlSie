using System.Text.Json.Serialization;

namespace RozswietlSie.Models
{
    public class OrderItem
    {
        public OrderItem(int id, int quantity, float total, int orderId,int productId)
        {
            Id = id;
            Quantity = quantity;
            Total = total;
            OrderId = orderId;
            ProductId = productId;
        }
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public float Total { get; set; }      
        public int OrderId { get; set; }
        public Product Product { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
    }
}
