import { Money } from "../../utils/money";
import { useNavigate } from "react-router"; // This hook can be used to get to some other URL or web page in our app
import axios from "axios";

export function PaymentSummary({ paymentSummary, loadCart }) {
    // Creating an instace of useNavigate hook
    const navigate = useNavigate();

    const placeOrder = async() => {
        await axios.post('/api/orders');
        await loadCart();
        // Also it's synchronus in nature so we don't need to use await
        navigate("/orders"); // To go to some other web page which is /orders
    };
     
    return (
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

            <button className="place-order-button button-primary"
                onClick={placeOrder}>
                Place your order
            </button>
        </div>
    );
}