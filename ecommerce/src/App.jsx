import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import './App.css';

function App() {
  /* The routes component we have here tell the browser the pages we wanna add to our web app
    the route component let's us add pages to out app*/
  return ( // Route takes the path to the webpage and the HTML component we need to render also for path = / we can simply use word 'index'
    <Routes>
      <Route index element={ <HomePage /> }></Route>
      <Route path='checkout' element={ <CheckoutPage /> } />
      <Route path='orders' element={ <OrdersPage /> } />
      <Route path='tracking' element={ <TrackingPage /> } />
    </Routes>
  )
}

export default App
