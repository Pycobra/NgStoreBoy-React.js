import React, { useEffect } from 'react';import { connect } from 'react-redux';
import { selectShopCollectionsAfterTransformToArray, selectShopCollectionAfterTransformToArray } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 
import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';
import "./collection-overview.styles.css"
import Directory from '../../components/directory-menu/directory-menu.component';
import { selectCartAddSuccessAlert } from "../../redux/cart/cart.selector";
import Popup from "../popup/popup.component";
import { selectProductList, selectIsCollectionFetching } from "../../redux/shop/shop.selectors";




const CollectionOverview = ({collections, alert, isCollectionFetching}) => {
    // console.log(collections)
    return (
        <div className='collections-overview'>
            {/* {alert ? <Popup>item was added to your cart</Popup> : null}  */}
            {collections
            ? collections.map((obj, idx) => {
            return     (
            <Directory isCollectionFetching={isCollectionFetching} key={idx} obj={obj} />
            )})
            : null
            }
        </div>

)}

const mapStateToProps = createStructuredSelector({
    alert: selectCartAddSuccessAlert,
    collections: selectShopCollectionAfterTransformToArray
})
export default connect(mapStateToProps)(CollectionOverview);