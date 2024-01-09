import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './Orders.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID'},
    { field: 'date', headerName: 'Data', width: 172 },
    { field: 'firstName', headerName: 'Imię' , width: 70},
    { field: 'lastName', headerName: 'Nazwisko' , width: 70},
    { field: 'email', headerName: 'Email' , width: 70},
    { field: 'city', headerName: 'Miasto' , width: 70},
    { field: 'street', headerName: 'Ulica' , width: 70},
    { field: 'orderTotal', headerName: 'Kwota' , width: 70},
    { field: 'orderStatus', headerName: 'Status' , width: 70},
];

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    
        fetch(`${process.env.REACT_APP_API_URL}/api/Order/GetAllOrders`)
          .then((response) => response.json())
          .then((data) => setOrders(data))
          .catch((error) => console.log(error));
    }, []);

    const handleRowClick = (params) => {
        const orderId = params.id;
        navigate(`/admin/productManagement/orderDetails/${orderId}`);
    };
       
    return ( 
        <div><Box display="flex" >
            <div className='table'>
                {orders.length > 0 ? (
                    <DataGrid
                        onRowClick={(params) => handleRowClick(params.row)}
                        rows={orders}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        rowHeight={150} 
                    />
                    ) : (
                        <h1>Brak zamówień</h1>
                    )}
            </div>
        </Box></div>
     );
}
 
export default Orders;