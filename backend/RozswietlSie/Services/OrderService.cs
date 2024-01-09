using Microsoft.EntityFrameworkCore;
using RozswietlSie.IServices;
using RozswietlSie.Models;

namespace RozswietlSie.Services
{
    public class OrderService : IOrderService
    {
        private readonly DBContext _dBContext;
        public OrderService(DBContext dBContext)
        {
            _dBContext = dBContext;
        }
        public Order GetOrderById(int id)
        {
            Order order = _dBContext.Orders
                  .Include(o => o.OrderItems) 
                    .ThenInclude(oi => oi.Product) 
                    .FirstOrDefault(o => o.Id == id) ?? throw new Exception("Not Found at " + id);
            return order;
        }

        public int Create(Order order, IEnumerable<ShoppingCartItem> shoppingCart)
        {
            _dBContext.Orders.Add(order);
            foreach (var cartItem in shoppingCart)
            {
                var orderItem = new OrderItem(0, cartItem.Quantity, cartItem.Total, order.Id, cartItem.Product.Id);
                order.OrderItems.Add(orderItem);
            }
            _dBContext.SaveChanges();
           
            return order.Id;
        }

        IEnumerable<Order> IOrderService.GetAll()
        {
            var orders = _dBContext.Orders.ToList();
            return orders;
        }


        public Order Update(int id, Order updatedOrder)
        {
            var existingOrder = _dBContext.Orders.Find(id) ?? throw new Exception("Not Exist");
            updatedOrder.Id = existingOrder.Id;
            _dBContext.Entry(existingOrder).CurrentValues.SetValues(updatedOrder);
            _dBContext.SaveChanges();
            return updatedOrder;
        }

        public int Delete(int id)
        {
            Order order = _dBContext.Orders.Find(id) ?? throw new Exception("Not Exist");
            _dBContext.Remove(order);
            _dBContext.SaveChanges();
            return 0;
        }
    }
}

