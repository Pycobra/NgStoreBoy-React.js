import React from 'react';
import "./checkbox-input.styles.css"

const CheckboxInput = ({children, handleChange, blacklabel, label, ...otherProps}) => {
    return (
        <div className="checkbox" >
            <input 
                type="checkbox"
                onChange={handleChange}
                {...otherProps}>
                { children }
            </input>
            {label
            ? <label className={blacklabel === "true" ? 'blacklabel' : 'greylabel'}>{label}</label>
            : null}
        </div>
        )
}
export default CheckboxInput;