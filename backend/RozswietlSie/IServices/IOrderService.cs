using RozswietlSie.Models;

namespace RozswietlSie.IServices
{
    public interface IOrderService
    {
        IEnumerable<Order> GetAll();
        Order GetOrderById(int id);
        int Create(Order order, IEnumerable<ShoppingCartItem> shoppingCart);
        Order Update(int id, Order order);
        int Delete(int id);
    }
}
