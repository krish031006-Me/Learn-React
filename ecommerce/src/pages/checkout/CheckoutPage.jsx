import axios from 'axios';
import { useState, useEffect } from 'react';
import './CheckoutPage.css';
import './checkout-header.css';
import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';

export function CheckoutPage({ cart, loadCart }) {
    // Using the State to store delivery options and payment summary
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    // Calling the Api for delivery options and payment summaries
    useEffect(() => {

    axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
        .then(res => {
            console.log("Delivery success:", res.data);
            setDeliveryOptions(res.data);
        })
        .catch(err => {
            console.log("Delivery API error:", err);
        });

    axios.get("/api/payment-summary")
        .then(res => {
            console.log("Payment success:", res.data);
            setPaymentSummary(res.data);
        })
        .catch(err => {
            console.log("Payment API error:", err);
        });

}, []);

    return ( // We are also changing the title of the page from here despite having some other title in /
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}