import { useState, useEffect } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Login.css';

export const Login = ({ setIsLoggedIn }) => {
    const [login, setLogin] = useState({
        userName: "",
        password: "",
    });
    const [logIn, setLogIn] = useState([false]);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleInputChange =( name, value ) => {
        setLogin({
            ...login,
            [name]: value,
        });
    };

    const handleLogout = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/MyAdmin/logout`, {
            method: 'POST',
            'credentials': 'include' ,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error logout');
            }
            return response.json();
        })
        .then(data => {
            setLogIn(false);
            setIsLoggedIn(false); 
            console.log('Logout successfully.');
        })
    };

    const handleLogin = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/MyAdmin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            'credentials': 'include' ,
            body: JSON.stringify(login),
            
        })
        .then(response => response.json())
        .then(data => {
            console.log("Login response:", data);
            console.log(data.roles);
            if(data.roles==='Admin'){
                setIsLoggedIn(false); 
                setTimeout(function() {
                setIsLoggedIn(true); 
                setLogIn(true);
            }, 100);
            }
            if(data.roles!=='Admin'){
                setIsLoggedIn(true); 
                setTimeout(function() {
                setIsLoggedIn(false); 
                setLogIn(false);
            }, 100);
            }
            
        })
        .catch(error => {
            console.error("Login error:", error);
            setIsLoggedIn(false); 
        });
    }

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_URL}/api/MyAdmin/checklogin`, {
            'credentials': 'include' ,
        })
        .then(response => response.json())
        .then(data => {
            if(data.roles==='Admin'){
            setLogIn(true);
            }
            if(data.roles!=='Admin'){
                setLogIn(false);
                }
       })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
    

    console.log('Executing useEffect in Navbar');
   
}, [isAdmin]);

    if(logIn){
        return (<div>
             <button className="button" type="button" onClick={handleLogout}>Wyloguj</button>               
        </div>)
    }

    return ( 
        <div className="container">
           
            <div className="content">  
                     
                <div className="edit-form">
                <h4>Zaloguj się jako administrator</h4>
                    <form className="forms">
                        <label>Login:</label>
                        <input
                            type="text"
                            name="userName"
                            value={login.userName}
                            onChange={(e) => handleInputChange('userName', e.target.value)}
                        />
                        <label>Hasło:</label>
                        <textarea
                            name="password"
                            value={login.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        
                       
                      
                        <button className="button" type="button" onClick={handleLogin}>Zaloguj</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;
