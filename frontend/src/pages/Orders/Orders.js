import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './Orders.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('pl-PL', options);
    return formattedDate;
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'date', headerName: 'Data', valueGetter: (params) => formatDate(params.row.date) },
    { field: 'firstName', headerName: 'Imię' },
    { field: 'lastName', headerName: 'Nazwisko' },
    { field: 'email', headerName: 'Email' },
    { field: 'city', headerName: 'Miasto' },
    { field: 'street', headerName: 'Ulica' },
    { field: 'orderTotal', headerName: 'Kwota' },
    {
        field: 'orderStatus',
        headerName: 'Status',
        valueGetter: (params) => (params.row.orderStatus ? 'wysłane' : 'w realizacji'),
    },
    {
        field: 'actions',
        headerName: 'Akcje',
        sortable: false,
        width: 140,
        renderCell: (params) => (
            <div className='buttons'>
                <button className='button1' onClick={(event) => handleChangeStatusClick(event, params.row)}>
                    Zmień status
                </button>
            </div>
        ),
    },
];



    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    
        fetch(`${process.env.REACT_APP_API_URL}/api/Order/GetAllOrders`,{'credentials': 'include' ,})
          .then((response) => response.json())
          .then((data) => setOrders(data))
          .catch((error) => console.log(error));
    }, []);

    const handleChangeStatusClick = (event, params) => {
        event.stopPropagation();
        const orderId = params.id;
        fetch(`${process.env.REACT_APP_API_URL}/api/Order/ChangeOrderStatus/${orderId}`, {
            method: 'PUT',
            'credentials': 'include',
          })
            .then((response) => {
              if (response.ok) {
                console.log(`Change order status`);
                fetch(`${process.env.REACT_APP_API_URL}/api/Order/GetAllOrders`,{
                    'credentials': 'include' })
                .then((response) => response.json())
                .then((data) => setOrders(data))
                .catch((error) => console.log(error));
              } else {
                console.error(`Failed change order status`);
              }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleRowClick = (params) => {
        const orderId = params.id;
        navigate(`/admin/productManagement/orderDetails/${orderId}`);
    };
       
    return ( 
        <div className='container'><Box display="flex" >
            <div className='table'>
                {orders.length > 0 ? (
                    <DataGrid
                        autoWidth
                        onRowClick={(params) => handleRowClick(params.row)}
                        rows={orders}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        rowHeight={50} 
                        
                    />
                    ) : (
                        <h1>Brak zamówień</h1>
                    )}
            </div>
        </Box></div>
     );
}
 
export default Orders;