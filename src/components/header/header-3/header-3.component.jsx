import React from "react";
import { ReactComponent as CaretDownSvg } from '../../asset/caret-down.svg';
import { ReactComponent as ShoppingCartSvg } from '../../asset/shopping-cart1.svg';
//import SearchBox from "../../search-box/search-box.component";
import SearchForm from "../../search-form/search-form.component"
import CustomButton from "../../custom-button/custom-button.component";
import "./header-3.styles.css";


const Header3 = () => ( 
        <div className="header-3">
            <div className="main-box">
                <div className="place-1">
                    <ul>
                        <li><span className="span1">Shop</span> <CaretDownSvg className="logo" id="caret5" /></li>
                        <li><span>Deals</span> <CaretDownSvg className="logo" id="caret6" /></li>
                        <li><span>Brands</span> <CaretDownSvg className="logo" id="caret7" /></li>
                        <li><span>Services</span> <CaretDownSvg className="logo" id="caret8" /></li>
                    </ul>
                </div>
                <div className="place-2">
                    {/* <form onSubmit={}> */}
                    <SearchForm inputtype='HomePage'/>
                </div>
            </div>
        </div>
)

export default Header3;
