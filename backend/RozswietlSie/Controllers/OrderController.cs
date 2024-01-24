using Microsoft.AspNetCore.Mvc;
using RozswietlSie.IServices;
using RozswietlSie.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RozswietlSie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        private const string ItemsList = "SessionItemList";
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                var userRole = HttpContext.Session.GetString("UserRole");
                if (string.IsNullOrEmpty(userRole) || userRole != "Admin")
                {
                    return Forbid();
                }
                var orders = _orderService.GetAll();
            return Ok(orders);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("GetOrderById/{id}")]
        public IActionResult GetOrderById(int id)
        {
            try
            {
                var userRole = HttpContext.Session.GetString("UserRole");
                if (string.IsNullOrEmpty(userRole) || userRole != "Admin")
                {
                    return Forbid();
                }
                var orders = _orderService.GetOrderById(id);
                var jsonOptions = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    MaxDepth = 32
                };

                var jsonResult = JsonSerializer.Serialize(orders, jsonOptions);

                return Ok(jsonResult);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("CreateOrder")]
        public IActionResult Create(Order order)
        {
            try
            {
                var sessionItems = HttpContext.Session.GetString(ItemsList);
                var shoppingItems = string.IsNullOrEmpty(sessionItems)
                    ? Enumerable.Empty<ShoppingCartItem>()
                    : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);

                
                var createdOrder = _orderService.Create(order, shoppingItems);


                if (HttpContext.Session != null)
                {
                    HttpContext.Session.Remove("SessionItemList");
                }

                return Created($"/api/order/GetOrderById/{createdOrder.Id}", createdOrder);
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpPut("UpdateOrder/{id}")]
        public IActionResult Update(int id, Order order)
        {
            try
            {
                var userRole = HttpContext.Session.GetString("UserRole");
                if (string.IsNullOrEmpty(userRole) || userRole != "Admin")
                {
                    return Forbid();
                }
                var updatedOrder = _orderService.Update(id, order);
                return Ok(updatedOrder);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("DeleteOrder/{id}")]
        public IActionResult Delete(int id)
        {

            try
            {
                var userRole = HttpContext.Session.GetString("UserRole");
                if (string.IsNullOrEmpty(userRole) || userRole != "Admin")
                {
                    return Forbid();
                }
                var deletedOrderId = _orderService.Delete(id);
                return Ok(deletedOrderId);
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpPut("ChangeOrderStatus/{id}")]
        public IActionResult OrderStatus(int id)
        {
            try
            {
                var userRole = HttpContext.Session.GetString("UserRole");
                if (string.IsNullOrEmpty(userRole) || userRole != "Admin")
                {
                    return Forbid();
                }
                var deletedOrderId = _orderService.ChangeOrderStatus(id);
                return Ok(deletedOrderId);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}

