import React from 'react';
import "./radio-input.styles.css"

const RadioInput = ({children, handleChange, blacklabel, label, ...otherProps}) => {
    return (
        <div className="radio" >
            <input 
                type="radio"
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
export default RadioInput;