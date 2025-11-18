import { Header } from '../../components/Header';
import './HomePage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart, loadCart }) {
    // These are states for setting up products 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // We can make the url shorter by using the server-proxy configuration 
        // The API call to fetch the products for the home page
        axios.get('/api/products')
            .then((response) => {
                // This is how we can get the data associated with the response asynchronously
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    /* Below we will be using map function to automatically create the HTML for the products
        and inside we used kind of like Jinja-ish syntax to access the props
        Also, we used a function toFixed() to convert the number to a fixed number of decimal places*/
    return ( 
        <>
            <title>Ecommerce</title>

            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}