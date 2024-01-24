import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className='main' >
            <div className='logo'>
                <img
                    className='image'
                    src={`${process.env.REACT_APP_API_URL}/logo.jpg`} 
                    alt="Logo"
                />
            </div>
            <div className='info1'>
                <h2>Własnoręcznie Tworzone</h2> 
                <h2>Świece z Wosku Sojowego</h2>
                    <p>
                        Świece sojowe palą się inaczej niż popularne świece parafinowe. 
                        <h4>Zdrowiej</h4>
                        Wosk sojowy nie zawiera pestycydów ani żadnych sztucznych substancji, które mogłyby osadzać się na naszych płucach w trakcie spalania.
                        <h4>Dłużej</h4>
                        Dodatkową zaletą jest fakt, że palą się nawet dwa razy dłużej niż świece parafinowe.
                    </p>
            </div>
        </div>
    );
}

export default Home;
