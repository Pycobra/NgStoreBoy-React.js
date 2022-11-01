import React from "react";
import "./cart-item.styles.css";



const CartItems = ({item, item: {images, price, name, quantity}}) => {
    const is_main_url = Object.keys(item).length !== 0 ? images.find(img => img.is_main) : null
    return(
    <div className="cart-item">
        <img src={is_main_url.url} alt="item" />
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price}</span>
        </div>
    </div>
)}

export default CartItems;