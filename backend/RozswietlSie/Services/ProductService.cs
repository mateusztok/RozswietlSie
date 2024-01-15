using Microsoft.AspNetCore.Http.HttpResults;
using RozswietlSie;
using RozswietlSie.IServices;
using RozswietlSie.Models;

namespace Zajęcia2_MVC.IRepository
{
    public class ProductService : IProductService
    {
        private readonly DBContext _dBContext;
        public ProductService(DBContext dBContext)
        {
            _dBContext = dBContext;
        }
        public IEnumerable<Product> GetAll()
        {
            var products = _dBContext.Products.ToList();
            return products;
        }
        public IEnumerable<Product> GetFilteredProducts(ProductFilters filters)
        {
            var query = _dBContext.Products.AsQueryable();

            if (!string.IsNullOrEmpty(filters.ProductName))
            {
                var upperProductName = filters.ProductName.ToUpper();
                query = query.Where(p => p.Name.ToUpper().Contains(upperProductName));
            }
            if (filters.MinPrice.HasValue)
                query = query.Where(p => p.Price >= filters.MinPrice);
            if (filters.MaxPrice.HasValue)
                query = query.Where(p => p.Price <= filters.MaxPrice);
            if (filters.IsAvailable.HasValue)
                query = query.Where(p => p.IsAvailable == filters.IsAvailable.Value);
            var products = query.ToList();
            return products;
        }
        public Product GetProductById(int id)
        {

            Product product = _dBContext.Products.Find(id) ?? throw new Exception("Not Found at " + id);
            return product;
        }
        public int Create(Product product)
        {
            _dBContext.Products.Add(product);
            _dBContext.SaveChanges();
            return product.Id;
        }
        public int Update(int id, Product updatedProduct)
        {
            var existingProduct = _dBContext.Products.Find(id) ?? throw new Exception("Not Exist");
            updatedProduct.Id = existingProduct.Id;
            _dBContext.Entry(existingProduct).CurrentValues.SetValues(updatedProduct);
            _dBContext.SaveChanges();
            return updatedProduct.Id;
        }
        public int? Delete(int id)
        {
            Product product = _dBContext.Products.Find(id) ?? throw new Exception("Not Exist");
            _dBContext.Remove(product);
            _dBContext.SaveChanges();
            return 0;
        }
    }
}
