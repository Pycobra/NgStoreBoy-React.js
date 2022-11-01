import React from "react";
import "./cart-icon.styles.css";
import { ReactComponent as ShoppingLogo } from '../../asset/shopping-bag.svg';
import { ReactComponent as ShoppingCartSvg } from '../../asset/shopping-cart1.svg';
import { connect } from "react-redux";
import { togleCartHidden } from "../../../redux/cart/cart.action";
import { selectCartItemsCount } from "../../../redux/cart/cart.selector";
import { createStructuredSelector } from 'reselect';



const CartIcon = ({itemCount, togleCartHidden}) => {
    const itemCountLenght = `${itemCount}`
    return (
    <div className="cart-icon" onClick={togleCartHidden}>
        <ShoppingCartSvg />
        <span className={`${itemCountLenght.length === 1 
                            ? 'item-count1' 
                            : itemCountLenght.length === 2 
                            ? 'item-count2' 
                            : 'item-count3'} item-count`}>{itemCountLenght}</span>
        <span style={{marginLeft: '8px'}} className="text" >Cart</span>
    </div>
)}
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})
const mapDispatchToProps = dispatch => ({
    togleCartHidden: () => dispatch(togleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);