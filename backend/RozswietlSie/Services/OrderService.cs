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

        public Order Create(Order order, IEnumerable<ShoppingCartItem> shoppingCart)
        {
            decimal TotalOrder = 0;
            _dBContext.Orders.Add(order);
            foreach (var cartItem in shoppingCart)
            {
                var orderItem = new OrderItem(0, cartItem.Quantity, cartItem.Total, order.Id, cartItem.Product.Id);
                TotalOrder += (decimal)cartItem.Total;
                order.OrderItems.Add(orderItem);
            }
            order.OrderTotal=TotalOrder;
            _dBContext.SaveChanges();
           
            return order;
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
        public int ChangeOrderStatus(int orderId)
        {
            var order = _dBContext.Orders.FirstOrDefault(o => o.Id == orderId);
            if (order == null)
            {
                throw new Exception("Not Found Order");
            }
            if (order.OrderStatus == true)
            {
                order.OrderStatus = false;
            }
            else
            {
                order.OrderStatus = true;
            }
            _dBContext.SaveChanges();
            return orderId; 
        }
    }
}

