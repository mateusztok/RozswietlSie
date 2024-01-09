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

                
                var id = _orderService.Create(order, shoppingItems);

                if (HttpContext.Session != null)
                {
                    HttpContext.Session.Clear();
                }
               
                return Created($"/api/order/GetOrderById/{id}", null);
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
                var deletedOrderId = _orderService.Delete(id);
                return Ok(deletedOrderId);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}

