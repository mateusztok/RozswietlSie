import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './ShoppingCart.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ShoppingCart = () => {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/shoppingCart/ShoppingCart/GetShoppingCart`,{
            'credentials': 'include' 
        })
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data);
            
                if (Array.isArray(data)) {
                    setShoppingCart(data);
                    const total = data.reduce((acc, curr) => acc + (curr.total), 0);
                    setOrderTotal(total);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => console.log(error));
    }, []);
    
    const handleCreateOrderClick = () => {
      if(shoppingCart.length !== 0) {
        navigate(`/orderForm`);
      }
    }

    const handleRowClick = (params) => {
        navigate(`/products/${params.row.product.id}`);
    }

    const handleDeleteClick = (event, id) => {
        event.stopPropagation();
        confirmAlert({
          title: 'Potwierdzenie',
          message: 'Czy na pewno chcesz usunąć ten produkt?',
          buttons: [
            {
              label: 'Tak',
              onClick: () => {
                fetch(`${process.env.REACT_APP_API_URL}/api/v1/shoppingCart/ShoppingCart/DeleteProductFromShoppingCart/${id}`, {
                  method: 'DELETE',
                  'credentials': 'include' 
                })
                  .then((response) => {
                    if (response.ok) {
                      const updatedCart = shoppingCart.filter(item => item.product.id !== id);
                      setShoppingCart(updatedCart);
                      const deletedProduct = shoppingCart.find(item => item.product.id === id);
                      const newOrderTotal = orderTotal - deletedProduct.total;
                      setOrderTotal(newOrderTotal);
                      console.log(`Product with ID ${id} deleted successfully`);
                    } else {
                      console.error(`Failed to delete product with ID ${id}`);
                    }
                  })
                  .catch((error) => console.error('Error:', error));
              },
            },
            {
              label: 'Nie',
              onClick: () => {
                console.log('Deletion canceled');
              },
            },
          ],
        });
      };

      const rows = shoppingCart?.map(shoppingCartItem => ({
        id: shoppingCartItem.id,
        product: {
          id: shoppingCartItem.product.id,
          name: shoppingCartItem.product.name,
          price: shoppingCartItem.product.price,
          description: shoppingCartItem.product.description,
          imageUrl: shoppingCartItem.product.imageUrl,
          isAvailable: shoppingCartItem.product.isAvailable
        },
        quantity: shoppingCartItem.quantity,
        total: shoppingCartItem.total
      })) || [];
      
    
      const columns = [
        { field: 'product.name', headerName: 'Nazwa',flex:1, renderCell: (params) => (<div>{params.row.product.name}</div>),},
        {  field: 'cena', headerName: 'Cena', renderCell: (params) => (`${params.row.product.price} PLN`) },
        { field: 'quantity', headerName: 'Sztuki', width: 60 },
        {
            field: 'product.imageUrl', headerName: 'Zdjęcie', renderCell: (params) => (
                <img src={`${process.env.REACT_APP_API_URL}/images/${params.row.product.imageUrl}`} 
                alt={params.row.product.name} 
                style={{ height: 76, width: 'auto',  borderRadius: '15px' }} />
            ),
            width: 130,
        },
        { field: 'total', headerName: 'Łącznie', width: 75, renderCell: (params) => (`${params.value} PLN`) },
        {
            field: 'actions',
            headerName: 'Akcje',
            sortable: false,
            width: 80,
            renderCell: (params) => (
                <div className='buttons'>
                    <button className='button2' onClick={(event) => handleDeleteClick(event, params.row.product.id)}>Usuń</button>
                </div>
            ),
            
        },
    ];

    return ( 
      <div><Box className='box' style={{ display: 'flex' }}>
            
            <div className='table'>
              {shoppingCart.length > 0 ? (
                <DataGrid
                onRowClick={handleRowClick}
                rows={shoppingCart}
                columns={columns}
                rowHeight={80} 
                />
                ) : (
                  <h1>Brak produktów</h1>
                )}
            </div>
            <div className='summary'>
            <h2>Suma zamówienia:</h2>
            <h3>{orderTotal} PLN</h3>
            
                    <button className='button1' onClick={(event) => handleCreateOrderClick()}>Złóż zamówienie</button>
              
            </div>
      </Box></div>
    );
}
 
export default ShoppingCart;