import './Navbar.css';
import { Link, Outlet } from "react-router-dom";
import '../../images/icons/css/fontello.css'
import React, { useState, useEffect } from 'react';

const Navbar = ({ isLoggedIn }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        
            fetch(`${process.env.REACT_APP_API_URL}/api/MyAdmin/checklogin`, {
                'credentials': 'include' ,
            })
            .then(response => response.json())
            .then(data => {
                if(data.roles==='Admin'){
                setIsAdmin(true);
                }
                if(data.roles!=='Admin'){
                    setIsAdmin(false);
                    }
           })
            .catch(error => {
                console.error('Error checking login status:', error);
            });
        
    
        console.log('Executing useEffect in Navbar');
       
    }, [isLoggedIn]);

    return ( 
        <div>
            <nav className="nav">
                <div className='navbar'>
                    <Link to="/">Rozświetl Się</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">O nas</Link>
                    {isAdmin ? <Link to="/admin/orders">Admin</Link>: ""}
                </div>
                <div className='icons'>
                <div className='icon'>
                    <Link className='cart' to="/shoppingCart">
                        <i className="icon-basket"></i>
                    </Link>
                </div>
                <div className='icon'>
                    <Link to="/login" className='cart'>
                        <i className="icon-user"></i>
                    </Link>
                </div>
                </div>
            </nav>
            <div className="wrapper">
                <Outlet />
            </div>
          
            </div>
     );
}
 
export default Navbar;