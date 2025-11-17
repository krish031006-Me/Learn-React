import dayjs from 'dayjs';
import { Money } from '../utils/money'
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import './OrdersPage.css';
import { Header } from '../components/Header'

export function OrdersPage({ cart }) {
    // The Orders for the user stored using State
    const [orders, setOrders] = useState([]);
    // calling backend API using axios to get the orders of the user
    useEffect(() => {
        axios.get("/api/orders?expand=products")
            .then((response) => {
                setOrders(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return ( 
                            <div key={order.id} className="order-container">
                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>                                            
                                            <div>{Money(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map((orderProduct) => {
                                        return (
                                            <Fragment key={orderProduct.id}>
                                                <div className="product-image-container">
                                                    <img src={orderProduct.product.image}/>
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {orderProduct.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on: {dayjs(orderProduct.product.estimatedDeliveryMs).format('MMMM D')}
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity: 1
                                                    </div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <a href="/tracking">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </a>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}