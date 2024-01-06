namespace RozswietlSie.Models
{
        public class Order
        {
        public Order(int id, DateTime date, string firstName, string lastName, string email, string phone, string city, string zipCode, string street, string houseNumber, decimal orderTotal, bool orderStatus)
        {
            Id = id;
            Date = date;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Phone = phone;
            City = city;
            ZipCode = zipCode;
            Street = street;
            HouseNumber = houseNumber;
            OrderTotal = orderTotal;
            OrderStatus = orderStatus;
        }
            public int Id { get; set; }
            public DateTime Date { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string City { get; set; }
            public string ZipCode { get; set; }
            public string Street { get; set; }
            public string HouseNumber { get; set; }
            public decimal OrderTotal { get; set; }
            public bool OrderStatus { get; set; }  //0-złożone 1-wysłane
            public ICollection<OrderItem> OrderItems { get; set; }
    }

}
