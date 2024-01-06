using RozswietlSie.Models;

namespace RozswietlSie.IServices
{
    public interface IProductService
    {
        public IEnumerable<Product> GetAll();
        public IEnumerable<Product> GetFilteredProducts(ProductFilters filters);
        public Product GetProductById(int id);
        public int Create(Product product);
        public int Update(int id, Product updatedProduct);
        public int? Delete(int id);
    }
}
