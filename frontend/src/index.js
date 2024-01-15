import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ProductList from './pages/ProductList/ProductList';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import ProductEdit from './pages/ProductEdit/ProductEdit';
import AddNewProduct from './pages/AddNewProduct/AddNewProduct';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ConfirmPlacedOrder from './pages/ConfirmPlacedOrder/ConfirmPlacedOrder';
import OrderForm from './pages/OrderForm/OrderForm';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import Admin from './components/Admin/Admin';
import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar isLoggedIn={isLoggedIn} />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/products', element: <ProductList /> },
        { path: '/products/:id', element: <ProductDetails /> },
        { path: '/about', element: <div>O nas</div> },
        { path: '/shoppingCart', element: <ShoppingCart /> },
        { path: '/login', element: <Login setIsLoggedIn={setIsLoggedIn} /> },
        { path: '/orderForm', element: <OrderForm /> },
        { path: '/confirmPlacedOrder', element: <ConfirmPlacedOrder /> },
        {
          path: '/admin',
          element: <Admin />,
          children: [
            { path: 'orders', element: <Orders /> },
            { path: '/admin/productManagement/orderDetails/:id', element: <OrderDetails /> },
            { path: '/admin/productManagement', element: <ProductManagement /> },
            { path: '/admin/productManagement/productEdit/:id', element: <ProductEdit /> },
            { path: '/admin/productManagement/addNewProduct', element: <AddNewProduct /> },
          ],
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
