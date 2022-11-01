import React from "react";
import "./pallete-content.styles.css";
import { connect } from "react-redux";
import PalleteItems from "../pallete-items/pallete-items.component";
import CustomButton from "../../custom-button/custom-button.component";
import { ReactComponent as StarSvg } from '../../asset/star.svg';
import {fetchAllUsersStart} from '../../../redux/user/user.action';
import { fetchAdminStateStart } from '../../../redux/admin/admin.action';
import {getCollectionsStart, startFetching} from '../../../redux/shop/shop.action';
import { selectCurrentClickedItem, selectCurrentClickedCategory,
    selectCurrentClickedProductType, selectCurrentClickedUser
} from "../../../redux/admin/admin.selector";
import { selectShopCollectionsData, selectShopCategoryData, 
    selectShopProductTypeData, selectShopCollectionAfterTransformToArray,
    selectShopCategoryAfterTransformToArray, selectShopProductTypeAfterTransformToArray
} from "../../../redux/shop/shop.selectors";
import { selectCurrentPallete, selectlastPage } from "../../../redux/admin/admin.selector";
import { selectUserData, } from "../../../redux/user/user.selector";
import Account from "../add-update-account/account.component";
import Item from "../add-update-collections/item/item.component";
import Category from "../add-update-collections/category/category.component";
import ProductType from "../add-update-collections/product-type/product-type.component";
import { createStructuredSelector} from "reselect"; 






const PalleteContent = ({ currentPallete, users_data, currently_clicked_item, category_data_array, 
    collection_data_array, currently_clicked_category, product_type_data_array, fetchAdminStateStart,
    handleAdminStates}) => {
    
    return (
        <div className="pallete-content">
            <div className={currentPallete === "account_pallete" || currentPallete === "category_pallete" ||
                currentPallete === "item_type_pallete" || currentPallete === "items_pallete" ||
                currentPallete === "add_account_page" || currentPallete === "add_category_page" ||
                currentPallete === "add_item_type_page" || currentPallete === "add_item_page"
                ? 'head' : null}>
                <h1>{
                    currentPallete === "account_pallete"
                    ? "Select account to change" : currentPallete === "category_pallete"
                    ? "Select category to change" : currentPallete === "item_type_pallete"
                    ? "Select item type to change" : currentPallete === "items_pallete"
                    ? "Select item to change" : currentPallete === "add_account_page"
                    ? "Change Account" : currentPallete === "add_category_page"
                    ? "Change Category" : currentPallete === "add_item_type_page"
                    ? "Change Item Type" : currentPallete === "add_item_page"
                    ? "Change Item" : null }
                </h1>
                
                {
                ((currentPallete !== "add_account_page" && currentPallete !== "update_account_page") 
                && (currentPallete !== "add_category_page" && currentPallete !== "update_category_page")
                && (currentPallete !== "add_item_type_page" && currentPallete !== "update_item_type_page") 
                && (currentPallete !== "add_item_page" && currentPallete !== "update_item_page" ))
                ? <CustomButton buttonType="isAdminPage" onClick={
                    () => {
                    return currentPallete === "account_pallete" ? handleAdminStates({page: 'add_account_page', 
                                            currently_clicked_item: currently_clicked_item, 
                                            currently_clicked_category: currently_clicked_category})
                    : currentPallete === "category_pallete" ? handleAdminStates({page: 'add_category_page', 
                                            currently_clicked_item: currently_clicked_item, 
                                            currently_clicked_category: currently_clicked_category})
                    : currentPallete === "item_type_pallete"  ? handleAdminStates({page: 'add_item_type_page',
                                            currently_clicked_item: currently_clicked_item,
                                            currently_clicked_category: currently_clicked_category})
                    : currentPallete === "items_pallete" ? handleAdminStates({page: 'add_item_page',
                                            currently_clicked_item: currently_clicked_item,
                                            currently_clicked_category: currently_clicked_category})
                    : null} 
                    }>
                        Add&nbsp; 
                    {
                    currentPallete === "account_pallete"
                    ? " Account  " : currentPallete === "category_pallete"
                    ? " Category  " : currentPallete === "item_type_pallete"
                    ? " Item Type  " : currentPallete === "items_pallete"
                    ? " Item  " : null 
                    }
                    {/* <StarSvg /> */}
                    <span style={{marginLeft:'5px'}}>&#10010;</span>
                  </CustomButton>
                : null
                }
            </div>
            <ul>
                {
                    currentPallete === "account_pallete"
                    ? users_data.map((user, idx) => (
                        <PalleteItems key={idx} text={user.username} handleAdminStates={() => handleAdminStates({page: 'update_account_page', 
                                                            currently_clicked_user: user.id, currently_clicked_category: currently_clicked_category})}/>
                    ))
                    :currentPallete === "category_pallete"
                    ? category_data_array.map((category, idx) => (
                        <PalleteItems key={idx} text={category.name} handleAdminStates={() => handleAdminStates({page: 'update_category_page', 
                                                                    currently_clicked_category: category.id})}/>
                    ))
                    : currentPallete === "item_type_pallete"
                    ? product_type_data_array.map((item_type, idx) => (
                        <PalleteItems key={idx} text={item_type.name} handleAdminStates={() => handleAdminStates({page: 'update_item_type_page', 
                                                                currently_clicked_product_type: item_type.id, currently_clicked_category: currently_clicked_category})}/>
                    ))
                    : currentPallete === "items_pallete"
                    ? collection_data_array.map(obj => {
                        return obj.items.map((itm, idx) => (
                            <PalleteItems  key={idx} text={itm.name} handleAdminStates={() => handleAdminStates({page: 'update_item_page',
                                                                    currently_clicked_item: itm.id, currently_clicked_category: itm.categoryId})}/>
                        ))
                    })
                    : currentPallete === "add_account_page" || currentPallete === "update_account_page"
                    ?   <Account page={
                            currentPallete === "add_account_page" 
                            ? "ADD-PAGE" 
                            : currentPallete === "update_account_page" 
                            ? "UPDATE-PAGE"
                            : null
                    } />
                    : currentPallete === "add_category_page" || currentPallete === "update_category_page"
                    ?   <Category page={
                            currentPallete === "add_category_page" 
                            ? "ADD-PAGE" 
                            : currentPallete === "update_category_page" 
                            ? "UPDATE-PAGE"
                            : null
                        } />
                    : currentPallete === "add_item_type_page" || currentPallete === "update_item_type_page"
                    ?   <ProductType page={
                            currentPallete === "add_item_type_page" 
                            ? "ADD-PAGE" 
                            : currentPallete === "update_item_type_page" 
                            ? "UPDATE-PAGE"
                            : null
                    } />
                    : currentPallete === "add_item_page" || currentPallete === "update_item_page"
                    ?   <Item page={
                            currentPallete === "add_item_page" 
                            ? "ADD-PAGE" 
                            : currentPallete === "update_item_page" 
                            ? "UPDATE-PAGE"
                            : null
                    } />
                    : null
                }
            </ul>
    </div>
)}
const mapStateToProps = createStructuredSelector({
    currentPallete: selectCurrentPallete,
    // collection_data: selectShopCollectionsData,
    collection_data_array: selectShopCollectionAfterTransformToArray,
    // last_page: selectlastPage,
    // currently_clicked_user: selectCurrentClickedUser,
    currently_clicked_item: selectCurrentClickedItem,
    currently_clicked_category: selectCurrentClickedCategory,
    // currently_clicked_product_type: selectCurrentClickedProductType,
    // product_type_data: selectShopProductTypeData,
    product_type_data_array: selectShopProductTypeAfterTransformToArray,
    // category_data: selectShopCategoryData,
    category_data_array: selectShopCategoryAfterTransformToArray,
    users_data: selectUserData
})
const mapDispatchToProps = dispatch => ({
    fetchAdminStateStart: (content) => dispatch(fetchAdminStateStart(content))
})
export default connect(mapStateToProps, mapDispatchToProps)(PalleteContent);




