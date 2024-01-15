import './OrderDetails.css';
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useParams } from "react-router-dom";

const columns = [
  { field: 'productId', headerName: 'Product ID'},
    { field: 'productName', headerName: 'Nazwa', flex: 1 },
    {
        field: 'img', headerName: 'Zdjęcie', renderCell: (params) => (
          <img src={`${process.env.REACT_APP_API_URL}/images/${params.value}`} alt={params.row.productName} style={{ height: 140, width: 'auto',  borderRadius: '30px' }}  />
        ),
        width: 200, 
      },
      
    { field: 'productPrice', headerName: 'Cena'},
    { field: 'quantity', headerName: 'Sztuki'},
    { field: 'total', headerName: 'Kwota' },

];

const OrderDetails = () => {
  const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState();

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/Order/GetOrderById/${id}`,{'credentials': 'include' ,})
          .then(response => response.json())
          .then(data => setOrder(data))
          .catch(error => console.log(error));
  }, [id]);
 
  const handleRowClick = (row) => {
    navigate(`/products/${row.row.productId}`);
  }
  
    const rows = order?.OrderItems?.$values?.map(orderItem => ({
      id: orderItem.Id,
      productId: orderItem.Product.Id,
      productName: orderItem.Product.Name,
      img: orderItem.Product.ImageUrl,
      productPrice: orderItem.Product.Price,
      quantity: orderItem.Quantity,
      total: orderItem.Total,
    })) || [];
    
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString('pl-PL', options);
      return formattedDate;
    };
    if (!order) {
        return <h1>Loading...</h1>
    }

    return (
      <div className="container">
        <div className="name">
        <p>
  {formatDate(order.Date)} Imię: {order.FirstName} Nazwisko: {order.LastName} {order.Email} Miato: {order.City} Ulica: {order.Street} Suma: {order.OrderTotal} PLN  Status: {order.OrderStatus==true?"Wysłane":"W realizacji"}
</p>
        </div>
        <div className="table_button">
          <div className="table">
            {rows.length > 0 ? (
              <DataGrid
                onRowClick={handleRowClick}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                rowHeight={150}
              />
            ) : (
              <p>Brak pozycji.</p>
            )}
          </div>
          
        </div>
      </div>
    );
  };
  

 
export default OrderDetails;