import React from "react";
import "./checkout-snippet.styles.css";
import { connect } from "react-redux";
import { clearItemFromCart, addItemStart, subtractItemQuantity } from "../../redux/cart/cart.action";
import CustomButton from "../custom-button/custom-button.component";





const CheckoutSnippet = ({cartItem, total, itemCount, forCheckoutItemComponent, forDeliveryAndAddressComponent}) => {
    const finalTotal = cartItem.delivery_fee ? cartItem.delivery_fee + total : total
    console.log(total)

    
    return (forDeliveryAndAddressComponent 
            ? 
            <div id="checkout-bottom-snippet">
                <div className="inner-box">
                    <span style={{position:"absolute",top:"30px",left:"0",width:"100%",height:"1px",backgroundColor:"#BBBCB6"}}></span>
                    <span style={{position:"absolute",top:"120px",left:"0",width:"100%",height:"1px",backgroundColor:"#BBBCB6"}}></span>
                    <div className="block1">
                        <span style={{width:"100%",fontWeight:"600",textAlign:"center"}}>ORDER SUMMARY</span>
                        <div className="total-qty1">
                            <span>Total quantity</span><span className="total-qty">{itemCount}</span>
                        </div>
                        <div className="total1">
                            <span>Total Price</span><span className="total-cost">N{total}</span>
                        </div>
                        <div className="delivery-amount1">
                            <span>Delivery Fee</span><span id="delivery-amt">{cartItem.delivery_fee ? cartItem.delivery_fee : 0 }</span>
                        </div>
                        <div className="final-total1">
                            <span>FINAL TOTAL</span><span id="final-total">N{finalTotal}</span>
                        </div>
                    </div>
                    <form>
                        <CustomButton  
                            buttonType="pay"
                            type="button"
                            name="paystack">
                                Pay now
                        </CustomButton>
                        {/* <button className="pay">Pay now</button> */}
                    </form>
                </div>
            </div>
            : 
            <div id="checkout-side-snippet">
                <span style={
                    cartItem.discount_price
                    ? ({position:"absolute", top:"20px",left:"0",width:"100%", height:"1px", backgroundColor:"#BBBCB6"})
                    : ({position:"absolute", top:"30px",left:"0",width:"100%", height:"1px", backgroundColor:"#BBBCB6"})
                    }></span>
                <span style={
                    cartItem.discount_price
                    ? ({position:"absolute", top:"95px",left:"0",width:"100%", height:"1px", backgroundColor:"#BBBCB6"})
                    : ({position:"absolute", top:"87px",left:"0",width:"100%", height:"1px", backgroundColor:"#BBBCB6"})
                    }></span>
                <div className="block1">
                    <span style={{width:"100%", fontWeight:"600", marginBottom:"5px", textAlign:"center"}}>{cartItem.name}</span>
                    <div className="unit-price">
                        <span>Unit Price</span><span data-index={cartItem.id} className="price_">N{cartItem.price}</span>
                    </div>
                    {
                    cartItem.discount_price
                    ? <div className="discount">
                        <span>Discount</span><span data-index={cartItem.id} className="discount_">N{cartItem.discount_price}</span>
                    </div>
                    : null
                    }
                    <div className="unit-total">
                        <span data-index={cartItem.id} className="qty_">Units Total (x {cartItem.quantity})</span><span data-index={cartItem.id} className="total_price_">{cartItem.total}</span>
                    </div>
                    <div className="subtotal">
                        <span>SUBTOTAL</span><span data-index={cartItem.id} className="subtotal_">${cartItem.subTotal}</span>
                    </div>
                </div>
            </div>

      )
  }
  
  const mapDispatchToProps = dispatch => ({
      clearItem: item => dispatch(clearItemFromCart(item)),
      add_item_start: item => dispatch(addItemStart(item)),
      subtract_item_quantity: item => dispatch(subtractItemQuantity(item))
  })
  export default connect(null, mapDispatchToProps)(CheckoutSnippet);

