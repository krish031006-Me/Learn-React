import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Using the state to store the reuslta from cart API
  const [cartItems, setCartItems] = useState([]);
  // Using the useEffect() to call the API and fetch cart details
  useEffect(() => {
    axios.get('/api/cart-items') 
      .then((response) => {
        console.log(response);
        setCartItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  /* The routes component we have here tell the browser the pages we wanna add to our web app
    the route component let's us add pages to out app*/
  return ( // Route takes the path to the webpage and the HTML component we need to render also for path = / we can simply use word 'index'
    <Routes>
      <Route index element={ <HomePage cart={cartItems}/> }></Route>
      <Route path='checkout' element={ <CheckoutPage cart={cartItems}/> } />
      <Route path='orders' element={ <OrdersPage /> } />
      <Route path='tracking' element={ <TrackingPage /> } />
    </Routes>
  )
}

export default App
