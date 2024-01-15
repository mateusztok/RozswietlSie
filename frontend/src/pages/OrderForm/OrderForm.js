import { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './OrderForm.css';

const OrderForm = () => {

    const defaultOrder = {       
        "id": 0,
        "firstName": "",
        "lastName": "",
        "phone": "",
        "email": "",
        "city": "",
        "zipCode": "",
        "street": "",
        "houseNumber": "",
        "orderTotal": 0,
    };
    
    
    const [shoppingCart, setShoppingCart] = useState([]);
    const [showBlikForm, setShowBlikForm] = useState(false);
    const [confirmBlikAlert, setConfirmBlikAlert] = useState(false);
    const [order, setOrder] = useState(defaultOrder);
    const navigate = useNavigate();
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const handleInputChange =( name, value ) => {
        setOrder({
            ...order,
            [name]: value,
        });
    };

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
                    
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => console.log(error));
    }, []);
    

    const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'zipCode', 'city', 'street', 'houseNumber'];

        for (const field of requiredFields) {
            if (!order[field]) {
                alert(`Wszystkie pola są wymagane.`);
                return false;
            }
        }

        return true;
    };
    const validateForm1 = () => {
        const requiredFields = ['blikCode'];

        for (const field of requiredFields) {
            if (!order[field]) {
                alert(`Niepoprawny kod blik.`);
                return false;
            }
        }

        return true;
    };
    const handleEnterBlikButtonClick = () => {
        if (isPaymentProcessing) {
            return;
        }
        if (!validateForm1()) {
            return;
        }
        if(shoppingCart.length === 0) {
            alert(`Koszyk jest pusty.`);
            return;
        }
        setIsPaymentProcessing(true);
        setConfirmBlikAlert(true);
        setTimeout(() => { window.scrollTo(0, document.body.scrollHeight);},300);
        setTimeout(() => { 

            fetch(`${process.env.REACT_APP_API_URL}/api/Order/CreateOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                'credentials': 'include' ,
                body: JSON.stringify(order),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding order');
                }
                return response.json();
            })
            .then(data => {
               
                console.log('Order aadded successfully:', data);
                confirmAlert({
                    title: 'Sukces',
                    message: 'Zamówienie zostało pomyślnie zlożone!',
                    buttons: [
                        {
                            label: `OK`,
                            onClick: () => navigate(`/confirmPlacedOrder`, { state: data })
                        }
                    ]
                });
            })
            .catch(error =>{
                console.error('Error added order:', error);
                alert('Wystąpił błąd podczas dodawania zamównienia. Spróbuj ponownie.');
                navigate(`/shoppingCart`);
        })
        .finally(() => {
            setIsPaymentProcessing(false);
          });
    },3000);
}

    const handleBlikFormButtonClick = () => {
        if(shoppingCart.length === 0) {
            alert(`Koszyk jest pusty.`);
            return;
        }
        if (!validateForm()) {
            return;
        }
        setShowBlikForm(true);
        setTimeout(() => { window.scrollTo(0, document.body.scrollHeight);},300);
    };

    return ( 
        <div className="container">
            <div className="name">  
                <h1>Wypełnij formularz</h1>
            </div>
            <div className="content">           
                <div className="edit-form">
                    <form className="forms">
                        <label>Imię:</label>
                        <input
                            type="text"
                            name="name"
                            value={order.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                        <label>Nazwisko:</label>
                        <textarea
                            type="text"
                            name="lastName"
                            value={ order.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                        <label>Telefon:</label>
                        <input
                            type="text"
                            name="phone"
                            value={order.phone}  
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                         <label>E-mail:</label>
                        <input
                            type="text"
                            name="email"
                            value={order.email}  
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                         <label>Kod pocztowy:</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={order.zipCode}  
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                         <label>Miasto:</label>
                        <input
                            type="text"
                            name="city"
                            value={order.city}  
                            onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                          <label>Ulica:</label>
                        <input
                            type="text"
                            name="street"
                            value={order.street}  
                            onChange={(e) => handleInputChange('street', e.target.value)}
                        />
                          <label>Numer domu:</label>
                        <input
                            type="text"
                            name="hauseNumber"
                            value={order.houseNumber}  
                            onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                        />
                        
                       
                        <button className="button" type="button" onClick={handleBlikFormButtonClick}>
                            Zapłać kodem BLIK
                        </button>
                    </form>

                    {showBlikForm && (
                        <form>
                            <label>Kod BLIK:</label>
                            <input
                                type="text"
                                name="blikCode"
                                value={order.blikCode}
                                onChange={(e) => handleInputChange('blikCode', e.target.value)} 
                            />
                            <button className="button" type="button" onClick={(e) => handleEnterBlikButtonClick('blikCode', e)}>
                                Zapłać
                            </button>
                        </form>
                    )}
                    {confirmBlikAlert && (
                       <p>Potwierdz płatność w aplikacji</p>
                    )}
                </div>
           
            </div>
        </div>
    );
}


export default OrderForm;

