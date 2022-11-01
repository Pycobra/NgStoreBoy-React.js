import React from 'react';
import "./form-input.styles.css"

const FormInput = ({children, handleChange, label, ...otherProps}) => {
    const {shrinkinputtype, homepage, roundbordertype, inputtype} = {...otherProps}
    return (
        shrinkinputtype==="true"
        ? (
            <div className="group">
                <input className="group-form-input" onChange={handleChange} {...otherProps} >
                {/* { children } */}
                </input>
                {
                label 
                ? (<label className={`${otherProps.value.length ? 'shrink' : ''} group-form-input-label`} >{label}</label>)
                : null
                }
            </div>
            )
        
        : (
            <input 
                onChange={handleChange} 
                className={`${
                    inputtype==='BigInputType1' ? "full-size-admin-input1 same-size" 
                    : inputtype==='BigInputType2' ? "full-size-admin-input2 same-size" 
                    : inputtype==='MidInputType' ? "mid-size-admin-input same-size"
                    : inputtype==='SmallInputType' ? "small-size-admin-input same-size"
                    : inputtype==='RoundBorderType' ? "round-border-input" 
                    : inputtype === "HomePage" ? "home-search-box-input" 
                    : inputtype === "HomePage HEADER-4" ? "home-search-box-input for-header-4"
                    : inputtype === "MenuSlideBar" ? "menu-bar-search"
                    : ''
                    } input-fields`
                } 
                {...otherProps}>
                    
                {/* { children } */}
            </input>
            )
        )
}
export default FormInput;