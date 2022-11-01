import React from "react";
import "./delivery-address.styles.css";
import { connect } from "react-redux";
import { clearItemFromCart, subtractItemQuantity } from "../../redux/cart/cart.action";
import { ReactComponent as ShoppingCartIcon2 } from '../asset/shopping-cart2.svg';
import { ReactComponent as ShoppingCartIcon3 } from '../asset/shopping-cart3.svg';
import { ReactComponent as ShoppingCartIcon4 } from '../asset/shopping-cart4.svg';
import CheckoutSnippet from "../checkout-snippet/checkout-snippet.component";
import RadioInput from "../radio-input/radio-input.component";
import CustomButton from "../custom-button/custom-button.component";


const DeliveryAndAddress = ({deliveryaddressess, cartItem, total, itemCount}) => {
    const handleOnChange = () => {

    }
    return (
        <div id="delivery-address">
            <div className="first-box">
                <div className="block block1">

                    <div className="head">
                        <span>Delivery Options</span>
                        <span>Please select your delivery options</span>
                    </div>

                    <div className="messages">
                        <div className="body">
                            <span>
                                <ShoppingCartIcon2 />
                                {/* <i style={{marginRight:"5px"}} className="fa fa-info"></i> */}
                                <span className="text">Please select a delivery method</span>
                            </span>
                            <div className="clear-delivery-msg">&times;</div>
                        </div>
                    </div>

                    
                    <div className="card card1" data-index="{{mydeliveryopt.id}}">
                        <div className="row">
                            <div className="place1">
                                <div className="icon">
                                    <ShoppingCartIcon4 />
                                    {/* <i className="fa fa-car"></i> */}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">aaaaaaaaaaaaa</p>
                                    <p className="card-text"><span>Your order should be delivered within</span> <span>bbbbbbbbbb</span></p>
                                    <p className="card-text"><span>delivery region</span> <span>cccccccccccccccccc</span></p>
                                    <p className="card-text"><span>delivery method</span> <span>ddddddddddddddddd</span></p>
                                    <p className="card-text"><span>delivery window</span> <span>eeeeeeeeee</span></p>
                                </div>
                            </div>
                            <div className="checkbox">
                                <RadioInput
                                    handleChange={(e) => handleOnChange}
                                    name="deliveryOption"
                                    />
                            </div>
                        </div>
                    </div>
                    <CustomButton buttonType="DeliveryCustomBtn1">select another delivery method1</CustomButton>
                    <CustomButton buttonType="DeliveryCustomBtn2">select another delivery method2</CustomButton>

                    <div className="all delivery">
                    {/* {% for deliveries in deliveryoptions %}
                    {% if deliveries.is_active %} */}
                    <div className="card card2" data-index="{{deliveries.id}}">
                    <div className="row">
                        <div className="place1">
                            <div className="icon">
                                <ShoppingCartIcon4 />
                                {/* <i className="fa fa-car"></i> */}
                            </div>
                            <div className="card-body">
                                <p className="card-text">aaaaaaaaaaaaaaa</p>
                                <p className="card-text"><span>Your order should be delivered within</span> <span>222dd</span></p>
                                <p className="card-text"><span>delivery region</span> <span>33ddd</span></p>
                                <p className="card-text"><span>delivery method</span> <span>eeeeee</span></p>
                                <p className="card-text"><span>delivery window</span> <span>3344</span></p>
                            </div>
                        </div>
                        <div className="checkbox">
                            <RadioInput
                                handleChange={(e) => handleOnChange}
                                name="deliveryOption"
                                />
                        {/* <input className="deliveryOption" type="radio" name="deliveryOption" value="{{deliveries.id}}" /> */}
                        </div>
                    </div>
                    </div>
                    {/* {% endif %}
                    {% endfor %} */}
                    </div>

                </div>


                
                <div className="block block2">

                    <div className="head">
                        <span>Delivery Address</span>
                        <span>Please select your delivery address</span>
                    </div>

                    <div className="messages">
                        <div className="body">
                            <span style={{display:"flex",flexWrap:"no-wrap"}}>
                                <ShoppingCartIcon2 />
                                {/* <i style={{marginRight:"5px"}} className="fa fa-info"></i> */}
                                <span className="text">Please select a delivery address</span>
                            </span>
                            <div className="clear-address-msg">&times;</div>
                        </div>
                    </div>

                    {/* {% if mydeliveryadd %} */}
                    <div className="card card1" data-index="{{mydeliveryadd.id}}">
                        <div className="row">
                            <div className="card-body">
                                <p className="card-text"><span>Fullname: </span> <span>ssssssss</span></p>
                                <p className="card-text"><span>Phone: </span> <span>ssssssss</span></p>
                                <p className="card-text"><span>Email2:</span> <span className="email-text" data-index="{{mydeliveryadd.id}}">jjjjjjjjjjjjjjjj</span></p>
                                <p className="card-text"><span>Post code:</span> <span>ssssssss</span></p>
                                <p className="card-text"><span>Town/city:</span> <span>dddddddddd</span></p>
                                <p className="card-text"><span>Address line1:</span> <span>dddddddddd</span></p>
                                <p className="card-text"><span>Address line2:</span> <span>dddddddddd</span></p>
                                <span className="edit">
                                    <ShoppingCartIcon2 />
                                    {/* <i className="fa fa-pencil"></i> <i className="fa fa-pencil"></i> */}
                                </span>
                            </div>
                            <div className="checkbox">
                                <RadioInput
                                    handleChange={(e) => handleOnChange}
                                    name="addressOption"
                                    />
                                {/* <input  className="addressOption" type="radio" name="addressOption" value="{{mydeliveryadd.id}}" /> */}
                            </div>
                            <span className="edit">
                                <span className="icon">
                                    <ShoppingCartIcon2 />
                                    {/* <i className="fa fa-trash" data-index="{{mydeliveryadd.id}}"></i> */}
                                </span>
                                <span className="icon">
                                    <ShoppingCartIcon2 />
                                    {/* <i className="fa fa-pencil" data-index="{{mydeliveryadd.id}}"></i> */}
                                </span>
                            </span>
                        </div>
                    </div>
                    <CustomButton buttonType="DeliveryCustomBtn1">1select another address</CustomButton>
                    <CustomButton buttonType="DeliveryCustomBtn2">2select another address</CustomButton>
                    {/* <div><CustomButton className="select-address1" 
                        style={deliveryaddressess === 0 
                            ? {display:"none", margin:"10px", marginBottom:"15px"} 
                            : {margin:"10px", marginBottom:"15px"}}>1select another address</CustomButton>
                    </div>
                    <div><CustomButton className="select-address2" 
                        style={{display:"none",margin:"10px",marginBottom:"15px"}}>
                            2select another address</CustomButton>
                    </div> */}

                    <div className="all address">
                        {/* {% if deliveryaddressess %}
                        {% for addressess in deliveryaddressess %} */}
                        <div className="card card2"  data-index="{{addressess.id}}">
                        <div className="row">
                            <div className="card-body">
                                <p className="card-text"><span>Fullname: </span> <span>aaaaaaa</span></p>
                                <p className="card-text"><span>Phone: </span> <span>bbbbbbb</span></p>
                                <p className="card-text"><span>Email5:</span> <span className="email-text" data-index="{{addressess.id}}">cccccc</span></p>
                                <p className="card-text"><span>Post code:</span> <span>dddddddd</span></p>
                                <p className="card-text"><span>Town/city:</span> <span>eeeeeeeeee</span></p>
                                <p className="card-text"><span>Address line1:</span> <span>fffffffff</span></p>
                                <p className="card-text"><span>Address line2:</span> <span>ggggggggg</span></p>
                            </div>
                            <div className="checkbox">
                                <RadioInput
                                    handleChange={(e) => handleOnChange}
                                    name="addressOption"
                                    />
                            {/* <input className="addressOption" type="radio" name="addressOption" value="{{addressess.id}}" /> */}
                            </div>
                            <span className="edit">
                                <span className="icon">
                                    <ShoppingCartIcon2 />
                                    {/* <i className="fa fa-trash del-address" data-index="{{addressess.id}}"></i> */}
                                </span>
                                <span className="icon">
                                    <ShoppingCartIcon2 />
                                    {/* <i className="fa fa-pencil" data-index="{{addressess.id}}"></i> */}
                                </span>
                            </span>
                        </div>
                        </div>
                        {/* {% endfor %}
                        {% endif %} */}
                    </div>
                    <div className=" card3">
                        <a href="{% url 'account_:add_address' %}">
                            <div className="row">
                                    <ShoppingCartIcon3 />
                                    {/* <i className="fa fa-plus"></i><span>Add address</span> */}
                            </div>
                        </a>
                    </div>

                </div>
            </div>

            <CheckoutSnippet cartItem={cartItem} total={total} itemCount={itemCount} forDeliveryAndAddressComponent />
            {/* <div className="checkout">
                <div className="box">
                    <span style={{position:"absolute",top:"30px",left:"0",width:"100%",height:"1px",backgroundColor:"#BBBCB6"}}></span>
                    <span style={{position:"absolute",top:"143px",left:"0",width:"100%",height:"1px",backgroundColor:"#BBBCB6"}}></span>
                    <div className="block1">
                        <span style={{width:"100%",fontWeight:"600",textAlign:"center"}}>ORDER SUMMARY</span>
                        <div className="unit-price">
                            <span>Total quantity</span><span className="total-qty">8</span>
                        </div>
                        <div className="discount">
                            <span>Total Price</span><span className="total-cost">N123</span>
                        </div>
                        <div className="discount">
                            <span>Estimated Tax</span><span>0</span>
                        </div>
                        <div className="unit-total">
                            <span>Delivery Fee</span><span id="delivery-amt">123</span>
                        </div>
                        <div className="total">
                            <span>FINAL TOTAL</span><span id="final-total">N1090</span>
                        </div>
                    </div>
                    <form>
                        <button className="pay">Pay now</button>
                    </form>
                </div>
            </div> */}
        </div>

      )
  }
  
  
  const mapDispatchToProps = dispatch => ({
      clearItem: item => dispatch(clearItemFromCart(item)),
      subtract_item_quantity: item => dispatch(subtractItemQuantity(item))
  })
  export default connect(null, mapDispatchToProps)(DeliveryAndAddress);


// const CheckoutItem = ({cartItem, clearItem, add_item, subtract_item_quantity}) => {
//   const {name, quantity, price, imageUrl} = cartItem
//    return (
//     <div className=" checkout-item">
//         <div className="image-container">
//             <img src={imageUrl} alt="item" />
//         </div>
//         <span className="name">{name}</span>
//         <span className="quantity">
//             <div className="arrow" onClick={() => subtract_item_quantity(cartItem)}>&#10094;</div>
//             <div className="value">{quantity}</div>
//             <div className="arrow" onClick={() => add_item(cartItem)}>&#10095;</div>
//         </span>
//         <span className="price">${price}</span>
//         <div className="remove-button" onClick={() => clearItem(cartItem)}> &#10005;</div>
//     </div>)
// }


// const mapDispatchToProps = dispatch => ({
//     clearItem: item => dispatch(clearItemFromCart(item)),
//     add_item: item => dispatch(addItem(item)),
//     subtract_item_quantity: item => dispatch(subtractItemQuantity(item))
// })
// export default connect(null, mapDispatchToProps)(CheckoutItem);