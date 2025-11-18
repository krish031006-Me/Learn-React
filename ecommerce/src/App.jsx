import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Using the state to store the reuslt from cart API
  const [cartItems, setCartItems] = useState([]);

  // This is the function to load the cart using backend API
  const loadCart = async () => {
      let response = await axios.get('/api/cart-items?expand=product')
      setCartItems(response.data);
    }
  /* Using the useEffect() to call the API and fetch cart details 
  We will be using async await for make our code better while dealing with promises
  Also, inside of useEffect() we cannot return a promise what we can return is a value or a cleanup function
  So, we wrap the async function in another function using inside useEffect()*/
  useEffect(() => {
    loadCart();
  }, []);

  /* The routes component we have here tell the browser the pages we wanna add to our web app
    the route component let's us add pages to out app*/
  return ( // Route takes the path to the webpage and the HTML component we need to render also for path = / we can simply use word 'index'
    <Routes>
      <Route index element={<HomePage cart={cartItems} loadCart={loadCart}/>}></Route>
      <Route path='checkout' element={<CheckoutPage cart={cartItems} loadCart={loadCart}/>} />
      <Route path='orders' element={<OrdersPage cart={cartItems} />} />
      <Route path='tracking' element={<TrackingPage />} />
    </Routes>
  )
}

export default App
