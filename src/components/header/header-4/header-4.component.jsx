import React from "react";
import { ReactComponent as ShoppingCartSvg } from '../../asset/shopping-cart1.svg';
import SearchForm from "../../search-form/search-form.component"
import CartIcon from "../../cart/cart-icon/cart-icon.component";
import CustomButton from "../../custom-button/custom-button.component";
import "./header-4.styles.css";

const Header4 = () => ( 
        <nav className="header-4">
            <div className="main-box">
                <div className="place-1">
                    {/* <form onSubmit={}> */}
                    <SearchForm inputtype="HomePage HEADER-4" />
                </div>
                <div className="place-2">
                <CartIcon />
                {/* <div className="wrap">
                    <ShoppingCartSvg className="logo" />
                    <div className="qty">0</div>
                    <span className="text" >Cart</span>
                </div> */}
                </div>
            </div>
        </nav>
)

export default Header4;
