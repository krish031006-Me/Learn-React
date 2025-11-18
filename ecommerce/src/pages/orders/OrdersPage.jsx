import { OrdersGrid } from './OrdersGrid'
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import './OrdersPage.css';
import { Header } from '../../components/Header'

export function OrdersPage({ cart }) {
    // The Orders for the user stored using State
    const [orders, setOrders] = useState([]);
    // calling backend API using axios to get the orders of the user
    useEffect(() => {
        const getData = async () => {
            let response = axios.get("/api/orders?expand=products")
            setOrders(response.data);
        }
        getData();
    }, []);

    return (
        <>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>
        </>
    );
}