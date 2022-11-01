import React from "react";
import { connect } from "react-redux";
import CustomButton from "../../custom-button/custom-button.component";
import "./cart-dropdown.styles.css";
import { useNavigate } from "react-router-dom"
import CartItems from "../cart-item/cart-item.component";
import { selectCartItems } from "../../../redux/cart/cart.selector";
import { createStructuredSelector } from 'reselect';
import { togleCartHidden } from "../../../redux/cart/cart.action";



const CartDropdown = ({cartItems, dispatch, togleCartHidden}) => {
    const navigate = useNavigate()
    const OnCardClick = window.onclick = function(event) {
        const clickedClass = event.target.className
        if (clickedClass == 'modal' || clickedClass == 'cart-dropdown-modal') {
            togleCartHidden()
        }
        else{
            return  
        }
    }
    return (
        <div className="modal" onClick={(e) => OnCardClick(e)}>
            <div className="cart-dropdown-modal" onClick={(e) => OnCardClick(e)}>
                <div className="cart-dropdown">
                    <div className="cart-items" >
                        {
                            cartItems.length
                            ? cartItems.map((item) => (
                                <CartItems key={item.id} item={item} />
                            ))
                            : <span className="empty-message">your cart is empty</span>
                        }
                    </div>
                    <CustomButton onClick={() => {
                        navigate('/checkout')
                        dispatch(togleCartHidden())
                        }} buttonType="CartCustomBtn" >GO TO CHECKOUT</CustomButton>
                </div>
            </div>
        </div>
)}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

const mapDispatchToProps = dispatch => ({
    togleCartHidden: () => dispatch(togleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);