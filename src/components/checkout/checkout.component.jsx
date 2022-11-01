import React from "react";
import { connect } from "react-redux";
import "./checkout.styles.css";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal, selectCartItemsCount } from "../../redux/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component.jsx";
import DeliveryAndAddress from "../../components/delivery-address/delivery-address.component"



const Checkout = ({cartItems, total, itemCount}) => {
    // console.log(cartItems)
    return (
        <div id="checkout">
        
            <div className="main-head"><h1 className="main-head-container">Your Cart</h1></div>
            {
            cartItems.length > 0
            ? <div className="box">
                {
                cartItems ?
                <div className="inside-box">
                    <div className="body-row">
                        {
                            cartItems.map(cartItem => (
                            <CheckoutItem key={cartItem.id} total={total} cartItem={cartItem}  />
                            ))
                        }
                        <DeliveryAndAddress cartItem={cartItems} total={total} itemCount={itemCount}/>
                    </div>
                </div>
                :
                <p>You dont have any product in your cart</p>
                }
            </div>
            : <div className="empty-box">Your cart is empty</div>
            }
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps)(Checkout);