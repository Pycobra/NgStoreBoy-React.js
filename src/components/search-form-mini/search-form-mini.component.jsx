import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {useLocation, useNavigate,} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import { ReactComponent as Search } from '../asset/small-search.svg';
import './search-form-mini.styles.css'

const SearchForm = ({handleSubmit,  label, ...otherProps}) => {
    let navigate = useNavigate()
    let location = useLocation()
    
    const handleChange = (e, label, nav) => {
        if (label === "search products"){
            console.log('namesss')
            nav(`search/${e.target.value}`)
        }
    }
    return ( 
        <form className={`${!label==="search products" ? "mini-search-form" : "mini-search-form for-menubar"}`}>
             <div className="search-field">
                 {/* <button className="icon"><i className="fa fa-search"></i></button>
                 <input type="text" className="input" placeholder="Search NGStoreboy" name="query"> */}
                 <CustomButton buttonType='MenuSlideBar'><Search /></CustomButton>
                 <FormInput  
                     inputtype='RoundBorderType'
                     handleChange={(e) => handleChange(e, label, navigate)}  
                     placeholder={label} 
                     type='text'/>
             </div>
        </form>
        // <form className="search-form" onSubmit={(e) => navigate(`search/${e.target.value}`)}>
        //     <div className="icon"><ShoppingCartSvg2 className="logo shopping-cart" /></div>
        //     {/* <SearchInput onChange={(e) => navigate(`search/${e.target.value}`)}  placeholder="search products" {...otherProps} /> */}
        //     <FormInput  
        //         inputtype='HomePage'
        //         handleChange={(e) => navigate(`search/${e.target.value}`)}  
        //         placeholder="search products" 
        //         {...otherProps} />
        //     {/* onClick={() => navigate(`search/${categoryUrl}`)} */}
        //     <CustomButton type="submit" buttonType="navSearchCustomBtn">Search</CustomButton>
        // </form>
        )

}

export default SearchForm;

