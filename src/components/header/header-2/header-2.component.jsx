import React from "react";
import { Link, renderMatches } from "react-router-dom";
import { ReactComponent as HelpSvg } from '../../asset/help.svg';
import { ReactComponent as ShoppingCartSvg } from '../../asset/orange-shopping-cart.svg';
import { ReactComponent as StarSvg } from '../../asset/star-blue.svg';
import { ReactComponent as UserSvg } from '../../asset/user.svg';
import MenuIcon from "../../mobile-view-icon/mobile-view-icon.component";
import { signOutStart } from "../../../redux/user/user.action";
import CartIcon from "../../cart/cart-icon/cart-icon.component";
import SearchForm from "../../search-form/search-form.component"
import "./header-2.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selector";




const Header2 = ({currentUser, signOutStart}) => ( 
        <div className="header-2">
            <div className="main-box">
                <div className="place-1">
                    <Link className="logo-container" to='NgStoreBoy-React.js/'>
                        <strong>NGStore<br/>Boy
                            <span className="outSpan"><ShoppingCartSvg className="logo shopping-cart" /><StarSvg className="logo star" /></span>
                        </strong>
                    </Link>
                    <SearchForm inputtype='HomePage'/>
                </div>
                <div className="place-2">
                    <div className="wrap" style={{cursor: 'pointer'}}>
                        <HelpSvg className="logo" />
                        <span className="help">Help</span>
                    </div>
                    <CartIcon />
                    <div className="wrap" style={{cursor: 'pointer'}}>
                        <UserSvg className="logo" />
                        {
                            currentUser ? (
                                <div onClick={signOutStart}><span className="sign-in-and-out">SignOut</span></div>
                                )
                                :
                                (
                                <Link to="/login"><span className="sign-in-and-out">SignIn</span></Link>
                                )
                        }
                    </div>
                </div>
                <div className="place-3">
                    <MenuIcon />
                </div>
            </div>
        </div>
)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
   signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header2);