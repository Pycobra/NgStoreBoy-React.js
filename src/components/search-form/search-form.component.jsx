import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import {useLocation, useNavigate,} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import { ReactComponent as SearchSvg } from '../asset/search-1.svg';
import { ReactComponent as ShoppingCartSvg2 } from '../asset/shopping-cart2.svg';
import './search-form.styles.css'

const SearchForm = ({handleSubmit, inputtype, ...otherProps}) => {
    let navigate = useNavigate()
    let location = useLocation()
    
    return ( 
        <form className={`${inputtype==='HomePage' 
            ? 'search-form'
            : "search-form for-header-4"}`} onSubmit={(e) => navigate(`NgStoreBoy-React.js/search/${e.target.value}`)}>
            <div className="icon"><SearchSvg className="logo shopping-cart" /></div>
            {/* <SearchInput onChange={(e) => navigate(`search/${e.target.value}`)}  placeholder="search products" {...otherProps} /> */}
            <FormInput  
                inputtype='HomePage'
                handleChange={(e) => navigate(`NgStoreBoy-React.js/search/${e.target.value}`)}  
                placeholder="search products" 
                {...otherProps} />
            {/* onClick={() => navigate(`search/${categoryUrl}`)} */}
            <CustomButton type="submit" buttonType="navSearchCustomBtn">Search</CustomButton>
        </form>
        )

}

export default SearchForm;

