import './header.css';
/* We are importing the Link component it is used to relace the anchor tags where you do now want the page
    to reload everytime
    THey can be accessed just like any component using <Link></Link> with a prop to="" instead of href in anchor tags */
import { Link } from 'react-router'; 

export function Header({ cart }) {
    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    })
    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo"
                        src="images/logo-white.png" />
                    <img className="mobile-logo"
                        src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />

                <button className="search-button">
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    );
}