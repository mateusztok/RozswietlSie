using Microsoft.AspNetCore.Mvc;
using RozswietlSie.IServices;
using RozswietlSie.Models;
using System.Text.Json;

namespace RozswietlSie.Controllers
{
    [Route("/api/v1/shoppingCart/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ShoppingCartController> _logger;
        private const string ItemsList = "SessionItemList";
        public ShoppingCartController(IProductService productService, ILogger<ShoppingCartController> logger)
        {
            _productService = productService;
            _logger = logger;
        }
        [HttpGet("GetShoppingCart")]
        public IEnumerable<ShoppingCartItem> GetShoppingCart()
        {
            try
            {
                var sessionItems = HttpContext.Session.GetString(ItemsList);
                var shoppingItems = string.IsNullOrEmpty(sessionItems)
                    ? Enumerable.Empty<ShoppingCartItem>()
                    : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);

                _logger.LogInformation("Shopping cart retrieved successfully.");

                return shoppingItems;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving shopping cart: {ex.Message}");
                throw;
            }
        }



        [HttpPost("AddProductToShoppingCart/{productId}")]
        public IActionResult AddItem([FromRoute] int productId)
        {
            try
            {
                var sessionId = HttpContext.Session.Id;
                var product = _productService.GetProductById(productId);

                if (product == null)
                    return BadRequest();

                var sessionItems = HttpContext.Session.GetString(ItemsList);
                var shoppingItems = string.IsNullOrEmpty(sessionItems)
                    ? new List<ShoppingCartItem>()
                    : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);
                var cartItem = shoppingItems.FirstOrDefault(i => i.Product.Id == product.Id);
                if (cartItem == null)
                {
                    shoppingItems.Add(new ShoppingCartItem(product.Id, product, 1, product.Price));
                }
                else
                {
                    cartItem.Quantity = cartItem.Quantity + 1;
                    cartItem.Total += cartItem.Product.Price;
                }
                var serializedItems = JsonSerializer.Serialize(shoppingItems);
                HttpContext.Session.SetString(ItemsList, serializedItems);
                _logger.LogInformation($"After adding product to cart: {JsonSerializer.Serialize(shoppingItems)}");
                return Ok(shoppingItems);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding product to cart: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("DeleteProductFromShoppingCart/{id}")]
        public IActionResult DeleteItem([FromRoute] int id)
        {
            var product = _productService.GetProductById(id);

            if (product == null)
                return BadRequest();

            var sessionItems = HttpContext.Session.GetString(ItemsList);
            var shoppingItems = string.IsNullOrEmpty(sessionItems)
                ? new List<ShoppingCartItem>()
                : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);

            shoppingItems = shoppingItems.Where(i => i.Product.Id != product.Id).ToList();

            var serializedItems = JsonSerializer.Serialize(shoppingItems);
            HttpContext.Session.SetString(ItemsList, serializedItems);
            _logger.LogInformation($"Product with ID {id} successfully deleted from the shopping cart.");


            return Ok(0);
        }
    }
}

