import React from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmPlacedOrder.css';
const ConfirmPlacedOrder = () => {
    const location = useLocation();
    const orderData = location.state; 

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('pl-PL', options);
        return formattedDate;
      };
    return (
        <div className="container">
            <div className="confirmation-message">
                <h1>Zamówienie złożone</h1>
                <p>Dziękujemy za złożenie zamówienia o numerze: {orderData.id}</p>
                <p>Twój zakup został pomyślnie zarejestrowany.</p>
                <p>Data złożenia zamówienia: {formatDate(orderData.date)}</p>
            </div>
        </div>
    );
};

export default ConfirmPlacedOrder;
