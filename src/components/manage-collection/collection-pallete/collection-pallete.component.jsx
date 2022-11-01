import React from "react";
import "./collection-pallete.styles.css";
import { connect } from "react-redux";
import PalleteItems from "../pallete-items/pallete-items.component";
import CustomButton from "../../custom-button/custom-button.component";
import { ReactComponent as StarSvg } from '../../asset/star.svg';
import { ReactComponent as CaretDownSvg } from '../../asset/caret-down.svg';
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
import PalleteContent from "../pallete-content/pallete-content.component";









class CollectionPallete extends React.Component {

    componentDidMount(){
        // const screenWidth = document.documentElement.clientWidth
        // const Pallet =  document.querySelector('.pallete-list')
        // if (screenWidth <= 550) {
        //     ClonedPallete = document.importNode(Pallet.content, true);
        //     ClonedPallete.setAttribute('style', 'position:absolute;top:0;left:0;width:50%;\
        //     border: 1px solid grey;background-color: var(--normalwhite)')
        //     Header.insertAdjacentElement('beforeend', ClonedPallete)
        // } 
        
    }
    handleAdminStates = (pallete) => {
        const { fetchAdminStateStart } = this.props
        const {payload} = fetchAdminStateStart(pallete)
    }
    HandleDisplay = (e) => {
        const PalleteList = document.querySelector('#collection-pallete .pallete-list2')
        console.log(PalleteList)
            PalleteList.classList.toggle('display-pallete-list2')
        // } else {
        //     PalleteList.classList.add('hide-pallete-list2')
        // }
    }

    render(){ 
        const { last_page, currently_clicked_item, currently_clicked_category} = this.props
        return (
            <div id="collection-pallete">
                <header>
                    <span className="head"><span className="display" onClick={e => this.HandleDisplay(e)}>display sidebar</span><CaretDownSvg className="caretdown"/></span>
                    <nav className="admin-nav" onClick={() => this.handleAdminStates({page: last_page,
                                                                    currently_clicked_item: currently_clicked_item,
                                                                    currently_clicked_category: currently_clicked_category})}>{"<< Go back >>"}</nav>
                    <div className="pallete-list2">
                        <div className='content'>
                            <h2>ACCOUNT</h2>
                            <ul>
                                <li onClick={() => this.handleAdminStates({page: 'account_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Accounts</li>
                            </ul>
                            <h2>ITEMS</h2>
                            <ul>
                                <li onClick={() => this.handleAdminStates({page: 'category_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Category</li>
                                <li onClick={() => this.handleAdminStates({page: 'item_type_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Item types</li>
                                <li onClick={() => this.handleAdminStates({page: 'items_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Items</li>
                            </ul>
                        </div>
                    </div>
                </header>
                
                <div className="body">
                    <div className="pallete-list">
                        <div className='content'>
                            <h2>ACCOUNT</h2>
                            <ul>
                                <li onClick={() => this.handleAdminStates({page: 'account_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Accounts</li>
                            </ul>
                            <h2>ITEMS</h2>
                            <ul>
                                <li onClick={() => this.handleAdminStates({page: 'category_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Category</li>
                                <li onClick={() => this.handleAdminStates({page: 'item_type_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Item types</li>
                                <li onClick={() => this.handleAdminStates({page: 'items_pallete', 
                                                                        currently_clicked_item: currently_clicked_item, 
                                                                        currently_clicked_category: currently_clicked_category})}>Items</li>
                            </ul>
                        </div>
                    </div>
                    <PalleteContent handleAdminStates={this.handleAdminStates} />
                    {/* <div className="pallete-content">
                            <div className={currentPallete === "account_pallete" || currentPallete === "category_pallete" ||
                                currentPallete === "item_type_pallete" || currentPallete === "items_pallete" ||
                                currentPallete === "add_account_page" || currentPallete === "add_category_page" ||
                                currentPallete === "add_item_type_page" || currentPallete === "add_item_page"
                                ? 'head' : null}>
                                <h1>{
                                    currentPallete === "account_pallete"
                                    ? "Select account to change"
                                    : currentPallete === "category_pallete"
                                    ? "Select category to change"
                                    : currentPallete === "item_type_pallete"
                                    ? "Select item type to change"
                                    : currentPallete === "items_pallete"
                                    ? "Select item to change"
                                    : currentPallete === "add_account_page"
                                    ? "Change Account"
                                    : currentPallete === "add_category_page"
                                    ? "Change Category"
                                    : currentPallete === "add_item_type_page"
                                    ? "Change Item Type"
                                    : currentPallete === "add_item_page"
                                    ? "Change Item"
                                    : null }
                                </h1>
                                
                                {
                                ((currentPallete !== "add_account_page" && currentPallete !== "update_account_page") 
                                && (currentPallete !== "add_category_page" && currentPallete !== "update_category_page")
                                && (currentPallete !== "add_item_type_page" && currentPallete !== "update_item_type_page") 
                                && (currentPallete !== "add_item_page" && currentPallete !== "update_item_page" ))
                                ? <CustomButton buttonType="isAdminPage" onClick={
                                    () => {
                                    return currentPallete === "account_pallete"
                                    ? this.handleAdminStates({page: 'add_account_page', 
                                                            currently_clicked_item: currently_clicked_item, 
                                                            currently_clicked_category: currently_clicked_category})
                                    : currentPallete === "category_pallete"
                                    ? this.handleAdminStates({page: 'add_category_page', 
                                                            currently_clicked_item: currently_clicked_item, 
                                                            currently_clicked_category: currently_clicked_category})
                                    : currentPallete === "item_type_pallete"
                                    ? this.handleAdminStates({page: 'add_item_type_page',
                                                            currently_clicked_item: currently_clicked_item,
                                                            currently_clicked_category: currently_clicked_category})
                                    : currentPallete === "items_pallete"
                                    ? this.handleAdminStates({page: 'add_item_page',
                                                            currently_clicked_item: currently_clicked_item,
                                                            currently_clicked_category: currently_clicked_category})
                                    : null} 
                                    }>
                                        Add 
                                    {
                                    currentPallete === "account_pallete"
                                    ? " Account  "
                                    : currentPallete === "category_pallete"
                                    ? " Category  "
                                    : currentPallete === "item_type_pallete"
                                    ? " Item Type  "
                                    : currentPallete === "items_pallete"
                                    ? " Item  "
                                    : null 
                                    }
                                    <StarSvg />
                                  </CustomButton>
                                : null
                                }
                            </div>
                            <ul>
                                {
                                //==========================================================
                                    currentPallete === "account_pallete"
                                    ? users_data.map((user, idx) => (
                                        <li className="pallete-items" 
                                            key={idx} 
                                            onClick={() => this.handleAdminStates({page: 'update_account_page', 
                                                                            currently_clicked_user: user.id, 
                                                                            currently_clicked_category: currently_clicked_category})} > 
                                                {user.username}
                                        </li>
                                        // <PalleteItems handlePallete={() => this.handlePallete('add_item_type_page')} key={item.id}  key={idx} product_type={item_type}/>
                                    ))
                                //==========================================================
                                    :currentPallete === "category_pallete"
                                    ? category_data_array.map(category => (
                                        <li className="pallete-items" 
                                            key={category.id} 
                                            onClick={() => {
                                                return this.handleAdminStates({page: 'update_category_page', 
                                                                            currently_clicked_category: category.id})
                                                }} > 
                                                {`${category.name}`}
                                        </li>
                                        // <PalleteIte ms handlePallete={() => this.handlePallete('add_category_page')} key={item.id} category={item.category}/>
                                    ))
                                //==========================================================
                                    : currentPallete === "item_type_pallete"
                                    ? product_type_data_array.map(item_type => (
                                        <li className="pallete-items" 
                                            key={item_type.id} 
                                            onClick={() => this.handleAdminStates({page: 'update_item_type_page', 
                                                                            currently_clicked_product_type: item_type.id, 
                                                                            currently_clicked_category: currently_clicked_category})} > 
                                                {`${item_type.name}`}
                                        </li>
                                        // <PalleteItems handlePallete={() => this.handlePallete('add_item_type_page')} key={item.id}  key={idx} product_type={item_type}/>
                                    ))
                                //==========================================================:
                                    : currentPallete === "items_pallete"
                                    ? collection_data_array.map(obj => {
                                        return obj.items.map((itm, idx) => {
                                            return (
                                                <li className="pallete-items" 
                                                    key={idx} 
                                                    onClick={() => this.handleAdminStates({page: 'update_item_page',
                                                                                    currently_clicked_item: itm.id,
                                                                                    currently_clicked_category: itm.categoryId})} > 
                                                    {`${itm.name}`}
                                                </li>)
                                        })
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
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentPallete: selectCurrentPallete,
    collection_data: selectShopCollectionsData,
    collection_data_array: selectShopCollectionAfterTransformToArray,
    last_page: selectlastPage,
    currently_clicked_user: selectCurrentClickedUser,
    currently_clicked_item: selectCurrentClickedItem,
    currently_clicked_category: selectCurrentClickedCategory,
    currently_clicked_product_type: selectCurrentClickedProductType,
    // currently_clicked_item: selectShopClickedItem,
    // currently_clicked_category: selectShopCurrentCategory,
    product_type_data: selectShopProductTypeData,
    product_type_data_array: selectShopProductTypeAfterTransformToArray,
    category_data: selectShopCategoryData,
    category_data_array: selectShopCategoryAfterTransformToArray,
    users_data: selectUserData
})
const mapDispatchToProps = dispatch => ({
    getCollectionsStart: (content) => dispatch(getCollectionsStart(content)),
    //fetchAllUsersStart: () => dispatch(fetchAllUsersStart())
    fetchAdminStateStart: (content) => dispatch(fetchAdminStateStart(content))
})
export default connect(mapStateToProps, mapDispatchToProps)(CollectionPallete);