import React, { useState } from "react";
import "./form-select.styles.css";
import { connect } from "react-redux";
import { selectShopProductTypeAfterTransformToArray, 
    selectShopCollectionsData,
    selectShopCategoryAfterTransformToArray} from "../../redux/shop/shop.selectors";
import { createStructuredSelector} from "reselect"; 




const FormSelect = ({children, label, data, to_be_selected, data_place, handleSelectChange, ...otherProps}) => {
    const {selecttype, type, name,} = {...otherProps}
    // const [optionChoice, setOptionChoice] = useState("")
    
    // const handleOption = (e) => {
    //     console.log(e.target)
    //     const {value} = e.target
    //     const childrens = e.target.children
    //     const itemContent = Array.from(childrens).find(itm => itm.innerText === value)
    //     // console.log(itemContent)
    //     setOptionChoice({optionChoice: value})
    // }
    return (
            <select
                onChange={handleSelectChange} 
                className={`${
                    selecttype==='MidInputType' ? "mid-size-admin-select same-size-select"
                    : selecttype==='MidInputType2' ? "mid-size2 same-size-select"
                    : ''
                    } select-fields`
                } 
                {...otherProps}>
                <option value={null}>{"--- --- --- --- --- ---"}</option>
                {
                data
                ? data.map(({name, id, parentName, grandParentName}, idx) => {
                    const rename = null
                    // parent ? rename = parent : rename = name
                    return (<option key={idx} id={id} name={name} 
                            value={to_be_selected === name ? name : null} 
                            // selected={to_be_selected === name ? true : false}
                            >
                            {grandParentName ? `${grandParentName} > ${parentName} > ${name}` : parentName ?  `${parentName} > ${name}` : name}
                    </option>)
                    
                })
                : null
            }
            </select>
        )
}
export default FormSelect;
// const mapStateToProps = createStructuredSelector({
//     collection_data: selectShopCollectionsData,
//     product_type_data_array: selectShopProductTypeAfterTransformToArray,
//     category_data_array: selectShopCategoryAfterTransformToArray,
// })
// export default connect(mapStateToProps)(FormSelect);