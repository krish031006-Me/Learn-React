import { OrdersGrid } from './OrdersGrid'
import { Money } from '../../utils/money'
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import './OrdersPage.css';
import { Header } from '../../components/Header'

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

            <OrdersGrid orders={orders}/>
            </div>
        </>
    );
}