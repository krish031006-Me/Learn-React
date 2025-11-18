import { Money } from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((option) => {
                let priceString = "FREE Shipping";
                if (option.priceCents > 0) {
                    priceString = `$${Money(option.priceCents)} - Shipping`;
                }

                // This is the function to update the delivery options
                const updateDeliveryOption = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: option.id 
                    });
                    await loadCart();
                };

                return ( // We are putting an onClick property on the whole div to make the whole option clickable
                    <div key={option.id} className="delivery-option"
                        onClick={updateDeliveryOption}>
                        <input type="radio"
                            checked={option.id === cartItem.deliveryOptionId}
                            onChange={() => {
                                    // We made this to avoid the warning that we get when we use checked we need to use onChange too
                                }}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
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
    );
}