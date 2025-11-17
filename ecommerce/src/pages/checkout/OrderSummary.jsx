import dayjs from "dayjs";
import {Money} from "../../utils/money"
import { DeliveryOptions } from './DeliveryOption'

export function OrderSummary({ deliveryOptions, cart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => { // That's the use of guard operator it'll work like a if-else now!
                // getting the selected delivery option so that we can display the date of that option
                const selectedOption = deliveryOptions
                    .find((deliveryOption) => { // .find() is a method used to find an item from an iterable having something specific
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

                            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem}/>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}