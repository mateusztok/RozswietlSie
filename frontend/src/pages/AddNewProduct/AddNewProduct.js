import { useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './AddNewProduct.css';

const AddNewProduct = () => {

    const defaultProduct = {       
        name: '',
        price: 0,
        description: '',
        imageUrl: 'image1.jpg',
        isAvailable: 0, 
    };
    const [product, setProduct] = useState(defaultProduct);
    const navigate = useNavigate();

    const handleInputChange =( name, value ) => {
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSaveClick = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/Product/CreateProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding product');
            }
            return response.json();
        })
        .then(data => {
           
            console.log('Product added successfully:', data);
            confirmAlert({
                title: 'Sukces',
                message: 'Produkt został pomyślnie dodany!',
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => navigate(`/admin/productManagement`)
                    }
                ]
            });
            navigate(`/admin/productManagement`);
        })
        .catch(error =>{
            console.error('Error added product:', error);
            alert('Wystąpił błąd podczas dodawania produktu. Spróbuj ponownie.');
            console.error('Error added product:', error)});
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
                <div className="edit-form">
                    <form className="forms">
                        <label>Nazwa:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <label>Opis:</label>
                        <textarea
                            name="description"
                            value={ product.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        <label>Cena:</label>
                        <input
                            type="number"
                            name="price"
                            value={ product.price}  
                            onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                        
                        <label>Dostępność:</label>
                        <Select
                            className="select"
                            label="Dostępność"
                            name="isAvailable"
                            value={product.isAvailable || 0}
                            onChange={(e) => handleInputChange('isAvailable', e.target.value)}
                        >
                            <MenuItem value={true}>Dostępny</MenuItem>
                            <MenuItem value={false}>Niedostępny</MenuItem>
                            
                        </Select>
                        <button className="button" type="button" onClick={handleSaveClick}>Zapisz</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AddNewProduct;
