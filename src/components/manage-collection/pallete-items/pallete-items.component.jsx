import "./pallete-items.styles.css";
import React from "react";
import { connect } from "react-redux";
import {getCollectionsStart} from '../../../redux/shop/shop.action';
import { selectShopCollectionsData } from "../../../redux/shop/shop.selectors";
import { selectCurrentPallete } from "../../../redux/admin/admin.selector";
import AddItem from "../add-update-collections/item/item.component";
import AddCategory from "../add-update-collections/category/category.component";
import AddProductType from "../add-update-collections/product-type/product-type.component";
import { createStructuredSelector} from "reselect"; 

const PalleteItems = ({text, handleAdminStates}) => (
        <li className="pallete-items" onClick={handleAdminStates}>{text}</li>    
)
export default PalleteItems;






