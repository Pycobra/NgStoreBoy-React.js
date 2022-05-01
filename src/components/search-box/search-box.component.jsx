import React from "react";
import  "./search-box.styles.css";


export const SearchBox = ({ placeholder, onSearchChange, onIncreaseLive }) => (
    <input 
        className="search"
        type="search" 
        placeholder={ placeholder } 
        //onChange={ onSearchChange }
        onChange={ onIncreaseLive }
    />
)