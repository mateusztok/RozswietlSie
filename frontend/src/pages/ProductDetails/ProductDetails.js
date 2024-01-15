import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css';


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/Product/GetProductById/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error));
    }, [id]);

    const handleAddToCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/shoppingCart/ShoppingCart/AddProductToShoppingCart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            
             },
             'credentials': 'include' 
        })
        .then(response => response.json())
        .then(data => {
            
                console.log('Product added to cart:', data);
                setIsAddedToCart(true);
            setTimeout(() => {
                setIsAddedToCart(false);
            }, 3000);
            console.log('Product added to cart:', data);
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
        });
    };
    

    if (!product) {
        return <h1>Loading...</h1>
    }

    return ( 
        <div className="container">
            <div className="name">  
             <h1>{product.name}</h1>
            </div>
            <div className="content">           
                <div className="img">
                    <img src={`${process.env.REACT_APP_API_URL}/images/${product.imageUrl}`} alt={product.name} />
                </div>
                <div className="info">
                    <div className="description">
                        <p>{product.description}</p>
                    </div>
                    <div className="price">
                        <h2>{product.price} PLN</h2>
                        Dostępność: {product.isAvailable ? 'Dostępny' : 'Niedostępny'}
                        <button className="addToCartBtn" onClick={handleAddToCart}>
                            Dodaj do koszyka
                        </button>
                        {isAddedToCart && <div className="addedToCartMessage">Produkt został dodany do koszyka!</div>}
                  
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProductDetails;