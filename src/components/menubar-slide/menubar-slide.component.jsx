import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { ReactComponent as ShoppingCartSvg } from '../asset/shopping-cart1.svg';
import { ReactComponent as StarSvg } from '../asset/star.svg';
import { ReactComponent as UserSvg } from '../asset/small-user.svg';
import { signOutStart } from "../../redux/user/user.action";
import MiniSearchForm from "../search-form-mini/search-form-mini.component"
import {useLocation, useNavigate,} from "react-router-dom";
import "./menubar-slide.styles.css";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectShopCategoryAfterTransformToArray } from "../../redux/shop/shop.selectors";



// this function is running twice and it args are becoming undefined on the second inexplicable run
// hereby creating issues



const MenubarSlide = ({currentUser, signOutStart, category_data_array}) => {
    let navigate = useNavigate()
    let location = useLocation()
    return (
    <div className="menu-slide-wrap">
        <div id="menu-slide">
            <ul>
                <div className="place-1">
                    <Link className="logo-container" to='/'>
                        <strong>NGStore<br/>Boy
                            <span className="outSpan"><ShoppingCartSvg className="logo shopping-cart" /><StarSvg className="logo star" /></span>
                        </strong>
                    </Link>
                   <MiniSearchForm label="search products"/>
                </div>
                
                <span style={{borderBottom:'1px solid rgba(0,0,0,0.1)',width:'90%',marginBottom:'10px'}}></span>
                
                <span className="head">MY ACCOUNT</span>
                <li className="account">
                    {
                        currentUser 
                        ?   (
                            <div onClick={signOutStart}><span className="sign-in-and-out">SignOut</span></div>
                            )
                            :
                            (
                            <Link role="button" to="/login"><UserSvg /> SignIn</Link>
                            )
                    }
                </li>
                
                <span style={{borderBottom:'1px solid rgba(0,0,0,0.1)',width:'90%',margin:'10px 0 10px 0'}}></span>
                
                <span className="head">OUR CATEGORIES</span>
                {
                    category_data_array.map((obj, idx) => (
                        <li key={obj.id} className="category-list">
                            <Link className="option" to={`/search/${obj.url}/${obj.id}`}>
                                {obj.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
)}


const mapStateToProps = createStructuredSelector({
    category_data_array: selectShopCategoryAfterTransformToArray,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
   signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(MenubarSlide);




















