using Microsoft.AspNetCore.Mvc;
using RozswietlSie.Models;

namespace RozswietlSie.IServices
{
    public interface IOrderService
    {
        IEnumerable<Order> GetAll();
        Order GetOrderById(int id);
        Order Create(Order order, IEnumerable<ShoppingCartItem> shoppingCart);
        Order Update(int id, Order order);
        int Delete(int id);
        int ChangeOrderStatus(int id);
    }
}
