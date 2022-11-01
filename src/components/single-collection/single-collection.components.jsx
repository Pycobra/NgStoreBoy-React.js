import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { addItemStart } from "../../redux/cart/cart.action";
import "./single-collection.styles.css";
import { Routes, Route, Navigate, matchPath, useParams, useNavigate, useLocation,
} from "react-router-dom";
import { selectSingleShopCollection, selectSingleShopCategory } from "../../redux/shop/shop.selectors";
import { selectCartAddSuccessAlert } from "../../redux/cart/cart.selector";
import GetPercentageAndPriceDifference  from "../get-percentage-and-price-difference-utils";
import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as ShoppingCartSvg } from '../asset/shopping-cart1.svg';
import { ReactComponent as ShoppingCartSvg5 } from '../asset/shopping-cart5.svg';
import { ReactComponent as TwitterSvg } from '../asset/twitter.svg';
import { ReactComponent as FaceBookSvg } from '../asset/facebook.svg';
import { ReactComponent as TwitterSvg2 } from '../asset/twitter2.svg';
import { ReactComponent as FaceBookSvg2 } from '../asset/facebook2.svg';
import { createStructuredSelector} from "reselect"; 
import Popup from "../popup/popup.component";
import { Link } from "react-router-dom";




const SingleCollection = ({addItemStart, alert}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { categoryUrl, collectionUrl, categoryId, collectionId } = useParams()
    const dataSet = useSelector(selectSingleShopCollection(categoryId, collectionId))
    const category = useSelector(selectSingleShopCategory(categoryId))
    const urlList = category.length === 1 ? [category[0], {url:categoryUrl, id:categoryId}]
                                    : category.length === 2 ? [category[0], category[1], {url:categoryUrl, id:categoryId}] 
                                    : [{url:categoryUrl, id:categoryId}]
    const {discount_percent, price_difference} = dataSet.length !== 0 ? GetPercentageAndPriceDifference(dataSet) : null
    const is_main_url = dataSet.length !== 0 ? dataSet.images.find(img => img.is_main) : []
    const all_img2 = dataSet.length !== 0 ? dataSet.images.filter(img => img.url !== null) : []
    
    // const all_img = dataSet.length !== 0 ? imageUrlsList.filter(img => img.map(itm => itm.url !== null ? itm : null)) : []
    return(
        <section id="single-collection">
        {alert ? <Popup>item added to your cart</Popup> : null} 
        <div className="main-box">
            <div className="main-head">
                <div id="head-notification" className="notification-success">
                    <div id="notification-message"></div>
                </div>
                <ul className="breadcrumbs">
                    <li><Link to='/' >Home  {">"}</Link></li>
                    {urlList.map(({url, id}) => (
                       <li className='breadcrumb-category'>
                            <div onClick={() => navigate(`NgStoreBoy-React.js/search/${url}/${id}`)}>{url} {">"}</div>
                       </li> 
                    ))}
                    <li>{dataSet.name}</li>
                </ul>
            </div>
            <div className="box">
                <div className="inside-box">
                    <div className="body-row">
                        <div className="top">
                            <div className="first-block">
                                <div className="block1">
                                    <div className="innerblock1">
                                        <img className="img-fluid" src={is_main_url.url} alt={dataSet.name} />
                                    </div>
                                    <div className="innerblock2">
                                        {
                                            dataSet.length !== 0
                                            ? all_img2.map((img, idx)=> (
                                                <img key={idx} className="sub-image" alt="Responsive image" src={img.url} />
                                            ))
                                            : null
                                        }
                                    </div>
                                    <span style={{width:'100%',height:'1px',backgroundColor:'rgba(0,0,0,0.1)'}}></span>
                                    <div className="innerblock3">
                                        <span>SHARE THIS PODUCT</span>
                                    </div>
                                    <div className="innerblock4">
                                        <span><FaceBookSvg2 /></span>
                                        <span><TwitterSvg2 /></span>
                                        <span><FaceBookSvg2 /></span>
                                    </div>
                                </div>
        
                                <div className="block2">
                                    <div className="innerblock">
                                        <div className="first-line">
                                            <div className="title">
                                                <span className="name">{dataSet.name}</span>
                                                {/* <span className="spec">_10</span> */}
                                                <span className="descr">{dataSet.description}</span>
                                            </div>
                                            <div className="social">
                                                <div id="wishlist">
                                                    {/* {% if wishlist_boolean %} */}
                                                    
                                                    <FaceBookSvg className="fa fa-shopping-bag icon1" style={{color:"var(--lightblue)"}}>Remove</FaceBookSvg>
                                                    <div>Remove</div>
                                                    {/* {% else %} */}
                                                    {/* <i className="fa fa-shopping-bag icon1" style={{color:"var(--lightblue)"}}> Add</i> */}
                                                    {/* {% endif %} */}
                                                </div>
                                                <div id="likes">
                                                    {/* {% if like_boolean %} */}
                                                    <FaceBookSvg className="fa fa-shopping-bag icon1" style={{color:"var(--lightblue)"}}>unlike</FaceBookSvg>
                                                    <div>unlike</div>
                                                    {/* {% else %} */}
                                                    {/* <i className="fa fa-heart-o icon2" style={{color:"var(--lightblue)"}}> like</i> */}
                                                    {/* {% endif %} */}
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{width:'100%',height:"1px",backgroundColor:"rgba(0,0,0,0.1)"}}></span>
                                        <div className="second-line">
                                            {
                                            dataSet.discount_price
                                            ? (<div>
                                                <span className="discount"><strong style={{margin:"12px 0",fontSize:"23px",fontWeight:"900"}}>N{dataSet.discount_price}</strong></span>
                                                <span className="price">
                                                    <strike>N{dataSet.price}</strike>
                                                    <span className="percent">%{parseInt(discount_percent)}</span>
                                                </span>
                                                </div>)
                                            :
                                            <span className="price"><strong className="price" style={{margin:"12px 0",fontSize:"26px",fontWeight:"900"}}>N{dataSet.price}</strong></span>
                                            }
                                            <span className="tax" style={{margin:"12px 0",fontSize:"16px"}}>+ includes tax</span>
                                            {/* <input style={{display:'none'}} type="number" name="quantity" id="add-to-cart-input" value="1" className="input" min="1" /> */}
                                        </div>
                                        <span style={{width:"100%",height:"1px",backgroundColor:"rgba(0,0,0,0.1)"}}></span>
                                        <div className="social-2">
                                            <span id="wishlist-no"> wishlist</span>
                                            <span id="likes-no"> likes</span>
                                        </div>
                                        <CustomButton type="button" onClick={() => addItemStart(dataSet)} buttonType="isSingleCollectionPage"><ShoppingCartSvg style={{fontWeight:'500',fontSize:'10px',marginRight:'30%'}}/> Add to basket </CustomButton>
                                        <span style={{width:'100%',height:'1px',backgroundColor:'rgba(0,0,0,0.1)',marginTop:'10px'}}></span>
                                        <div className="promo" style={{margin:"8px 0",fontSize:"16px",fontWeight:"900"}}>PRODUCT PROMOTIONS</div>
                                        <div className="promo1" style={{margin:"8px 0 0 8px",fontSize:"16px",color:"var(--lightblue)"}}><FaceBookSvg /> Enjoy cheaper shipping fees when you select a PickUp station at checkout</div>
                                        <div className="promo2" style={{margin:"10px 0 0 8px",fontSize:"16px",color:"var(--lightblue)"}}><FaceBookSvg /> Borrow to buy</div>
                                    </div>
                                </div>
                            </div>
                            <div className="last-block">
                                <div className="box1">
                                    <div className="door-delivery">
                                        <ShoppingCartSvg5 style={{padding:'3px', border:'1px solid black', marginRight:'5px', borderRadius:'2px'}} className="fa fa-heart-o"/>
                                        <div>
                                            <div>Door Delivery</div>
                                            <div><span style={{fontWeight:"normal",fontSize:"14px"}}>Shipping</span> <span>#450</span></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="pick-up">
                                        <ShoppingCartSvg5 style={{padding:'3px', border:'1px solid black', marginRight:'5px', borderRadius:'2px'}} className="fa fa-heart-o"/>
                                        <div>
                                            <div>Pickup Station</div>
                                            <div><span style={{fontWeight:'normal',fontSize:'14px'}}>Shipping</span> <span>#180</span></div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="return-policy">
                                        <ShoppingCartSvg5 style={{padding:'3px', border:'1px solid black', marginRight:'5px', borderRadius:'2px'}} className="fa fa-heart-o"/>
                                        <div>
                                            <div>Return Policy</div>
                                            <div style={{fontWeight:'normal',fontSize:'14px'}}>unsatisfactory Items must be returned in 7days after purchase</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        </div>
                    </div>
                </div>
        </div>
        </section>
    )
}

const mapStateToProps = createStructuredSelector({
    alert : selectCartAddSuccessAlert,
})
const mapDispatchToProps = dispatch => ({
    addItemStart: item => dispatch(addItemStart(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleCollection);






