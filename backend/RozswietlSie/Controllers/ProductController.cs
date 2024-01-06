using Microsoft.AspNetCore.Mvc;
using RozswietlSie.IServices;
using RozswietlSie.Models;

namespace RozswietlSie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            try
            {
                var products = _productService.GetAll();
                return Ok(products);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("GetProductById")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var product = _productService.GetProductById(id);
            return Ok(product);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("GetFiltredProducts")]
        public IActionResult GetFilteredProducts([FromQuery] ProductFilters filters)
        {
            try { 
                var products = _productService.GetFilteredProducts(filters);
                return Ok(products);
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpPost("CreateProduct")]
        public IActionResult CreateProduct(Product product)
        {
            try
            {
                var id = _productService.Create(product);
                return Created($"/api/product/{id}", product);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("UpdateProduct/{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            try
            {
                var updatedProduct = _productService.Update(id, product);
                return Ok(updatedProduct);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var deletedProductId = _productService.Delete(id);
                return Ok(deletedProductId);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
