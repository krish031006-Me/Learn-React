import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './CheckoutPage.css';
import './checkout-header.css';
import { Money } from '../utils/money';

export function CheckoutPage({ cart }) {
    // Using the State to store delivery options and payment summary
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    // Calling the Api for delivery options and payment summaries
    useEffect(() => {
    console.log("useEffect triggered");

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
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map((cartItem) => { // That's the use of guard operator it'll work like a if-else now!
                            // getting the selected delivery option so that we can display the date of that option
                            const selectedOption = deliveryOptions
                                .find((deliveryOption) =>{ // .find() is a method used to find an item from an iterable having something specific
                                    // returning the deliveryOption.id only if it's equal to cartItem.deliveryOptionUd
                                    return deliveryOption.id === cartItem.deliveryOptionId 
                                });

                            return ( 
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {dayjs(selectedOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                {Money(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">
                                                        {cartItem.quantity}
                                                    </span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliveryOptions.map((option) => {
                                                let priceString = "FREE Shipping";
                                                if (option.priceCents > 0) {
                                                    priceString = `$${Money(option.priceCents)} - Shipping`;
                                                }
                                                return (
                                                    <div key={option.id} className="delivery-option">
                                                        <input type="radio" 
                                                            checked={option.id === cartItem.deliveryOptionId} 
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${cartItem.productId}`}/>
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {priceString}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>
                        
                        <div className="payment-summary-row">                    
                            <div>Items ({paymentSummary?.totalItems // We used a ? here which acts like a if-else statement if paymentSummary exists then fo this
                            }):</div> 
                            <div className="payment-summary-money">
                                {Money(paymentSummary?.productCostCents)}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">
                                {Money(paymentSummary?.shippingCostCents)}
                            </div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">
                                {Money(paymentSummary?.totalCostBeforeTaxCents)}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">
                                {Money(paymentSummary?.taxCents)}
                            </div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">
                                {Money(paymentSummary?.totalCostCents)}
                            </div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}