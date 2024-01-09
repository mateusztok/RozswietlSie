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
        private IProductService _productService;
        private const string ItemsList = "SessionItemList";
        public ShoppingCartController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet("GetShoppingCart")]
        public IEnumerable<ShoppingCartItem> GetShoppingCart()
        {
            var sessionItems = HttpContext.Session.GetString(ItemsList);
            var shoppingItems = string.IsNullOrEmpty(sessionItems)
                ? Enumerable.Empty<ShoppingCartItem>()
                : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);

            return shoppingItems;
        }


        [HttpPost("AddProductToShoppingCart")]
        public IActionResult AddItem(int productId)
        {
            var product = _productService.GetProductById(productId);

            if (product == null)
                return BadRequest();

            var sessionItems = HttpContext.Session.GetString(ItemsList);
            var shoppingItems = string.IsNullOrEmpty(sessionItems)
                ?  new List<ShoppingCartItem>() 
                : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);

            var cartItem = shoppingItems.FirstOrDefault(i => i.Product.Id == product.Id);

            if (cartItem == null)
            {
                shoppingItems.Add(new ShoppingCartItem(0, product, 1, product.Price));
                
            }
            else
            {
                cartItem.Quantity = cartItem.Quantity + 1;
                cartItem.Total += cartItem.Product.Price;
                
            }

            var serializedItems = JsonSerializer.Serialize(shoppingItems);
            HttpContext.Session.SetString(ItemsList, serializedItems);

            return Ok(0);
        }

        [HttpDelete("DeleteProductFromShoppingCart")]
        public IActionResult DeleteItem(int productId)
        {
            var product = _productService.GetProductById(productId);

            if (product == null)
                return BadRequest();

            var sessionItems = HttpContext.Session.GetString(ItemsList);
            var shoppingItems = string.IsNullOrEmpty(sessionItems)
                ? new List<ShoppingCartItem>()
                : JsonSerializer.Deserialize<List<ShoppingCartItem>>(sessionItems);

            shoppingItems = shoppingItems.Where(i => i.Product.Id != product.Id).ToList();

            var serializedItems = JsonSerializer.Serialize(shoppingItems);
            HttpContext.Session.SetString(ItemsList, serializedItems);

            return Ok(0);
        }
    }
}

