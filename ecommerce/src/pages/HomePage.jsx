import { Header } from '../components/Header';
import './HomePage.css';
import { useEffect, useState } from 'react';

export function HomePage() {
    // These are states for setting up products and the cart
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // The API call to fetch the products for the home page
        fetch('http://localhost:3000/api/products')
            .then((response) => {
                // This is how we can get the data associated with the response asynchronously
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            });
        // The API call to fetch the cart items
        fetch('http://localhost:3000/api/cart-items')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCartItems(data);
            })
    }, []);

    /* Below we will be using map function to automatically create the HTML for the products
        and inside we used kind of like Jinja-ish syntax to access the props
        Also, we used a function toFixed() to convert the number to a fixed number of decimal places*/
    return ( 
        <>
            <title>Ecommerce</title>

            <Header cart={cartItems}/>

            <div className="home-page">
                <div className="products-grid">

                    {products.map((product) => {
                        return (
                            <div key={product.id} className="product-container">
                                <div className="product-image-container">
                                    <img className="product-image"
                                        src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {product.rating.count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    {(product.priceCents / 100).toFixed(2)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}