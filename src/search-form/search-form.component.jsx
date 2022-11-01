import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {useLocation, useNavigate,} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import { ReactComponent as ShoppingCartSvg2 } from '../asset/shopping-cart2.svg';
import './search-form.styles.css'

const SearchForm = ({handleSubmit, ...otherProps}) => {
    let navigate = useNavigate()
    let location = useLocation()
    
    return ( 
        <form className="search-form" onSubmit={(e) => navigate(`search/${e.target.value}`)}>
            <div className="icon"><ShoppingCartSvg2 className="logo shopping-cart" /></div>
            {/* <SearchInput onChange={(e) => navigate(`search/${e.target.value}`)}  placeholder="search products" {...otherProps} /> */}
            <FormInput  
                inputtype='HomePage'
                handleChange={(e) => navigate(`search/${e.target.value}`)}  
                placeholder="search products" 
                {...otherProps} />
            {/* onClick={() => navigate(`search/${categoryUrl}`)} */}
            <CustomButton type="submit" buttonType="navSearchCustomBtn">Search</CustomButton>
        </form>
        )

}

export default SearchForm;

