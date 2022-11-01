import React from "react";
import "./checkout-item.styles.css";
import { connect } from "react-redux";
import { clearItemFromCart, addItemStart, subtractItemQuantity } from "../../redux/cart/cart.action";
import { ReactComponent as GabbageIcon } from '../asset/shopping-cart2.svg';
import CheckoutSnippet from "../checkout-snippet/checkout-snippet.component";
import GetPercentageAndPriceDifference  from "../get-percentage-and-price-difference-utils";
// import DeliveryAndAddress from "../delivery-address/delivery-address.component"
import CustomButton from "../custom-button/custom-button.component";

const CheckoutItem = ({cartItem, total, clearItem, add_item_start, subtract_item_quantity}) => {
    const {discount_percent, price_difference} = GetPercentageAndPriceDifference(cartItem)
    const {id, name, quantity, discount_price, price, images} = cartItem
    const is_main_url = Object.keys(cartItem).length !== 0 ? images.find(img => img.is_main) : []
    return (
      
        <div data-index={id} className="checkout-item">
            <div className="first-block">
                <div className="block1">
                    <div className="innerblock1">
                        <img src={is_main_url.url} className=""  alt="Responsive-Image" />
                    </div>
                </div>
                <div className="block2">
                    <div className="innerblock">
                        <div className="first-line">
                            <a className="title">{name}</a>
                            <div className="social">
                            <CustomButton  
                                onClick={() => subtract_item_quantity(cartItem)} 
                                className="subtract-qty" 
                                type="button">
                                    --
                            </CustomButton>
                            <span  data-index={id} className="item-qty">{quantity}</span>
                            <CustomButton  
                                onClick={() => add_item_start(cartItem)} 
                                className="add-to-qty" 
                                type="button">
                                    +
                            </CustomButton>
                            </div>
                        </div>
                        <div className="second-line">
                            <div>
                                <span className={`${cartItem.discount_price ? "price" : ""}`}>N{price}</span>
                                {
                                cartItem.discount_price
                                ? <div className="discount_price">
                                      <span className="price1"><strike>N{discount_price}</strike></span>
                                      <span className="price2" style={{color:"var(--normalorange)",fontSize:"14px", marginLeft:"5px"}}>saving </span>
                                      <span className="price3" style={{color:"var(--normalorange)",fontSize:"14px", marginLeft:"5px"}}>{price_difference}</span>
                                  </div>
                                : null
                                }
                            </div>
                            <CustomButton  
                                onClick={() => clearItem(cartItem)} 
                                className="delete-item" 
                                type="button">
                                    <GabbageIcon />
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutSnippet cartItem={cartItem} total={total} forCheckoutItemComponent />
        </div>
      )
  }
  

  const mapDispatchToProps = dispatch => ({
      clearItem: item => dispatch(clearItemFromCart(item)),
      add_item_start: item => dispatch(addItemStart(item)),
      subtract_item_quantity: item => dispatch(subtractItemQuantity(item))
  })
  export default connect(null, mapDispatchToProps)(CheckoutItem);