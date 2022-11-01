import { useNavigate, useLocation, useParams,} from "react-router-dom";
import { selectShopCollectionsData, 
    selectShopProductTypeData, 
    selectShopCategoryData,
    // selectShopProductTypeSearch,
    // selectShopCategorySearch, 
    selectShopCategoryAfterTransformToArray,
    selectShopProductTypeAfterTransformToArray,
    selectShopCollectionAfterTransformToArray,
 } from "../../redux/shop/shop.selectors";
 import { compose } from 'redux';
import { connect } from "react-redux";
import { getCollectionsStart, handleChkBtnFromSearchStart } from '../../redux/shop/shop.action';
import { createStructuredSelector} from "reselect"; 
import CollectionSearch from "./collection-search2.component.";
import withSpinner from "../with-spinner/with-spinner.component";
import { addItemStart } from "../../redux/cart/cart.action";


const mapStateToProps = createStructuredSelector({
    collection_data_array: selectShopCollectionAfterTransformToArray,
    product_type_data_array: selectShopProductTypeAfterTransformToArray,
    category_data_array: selectShopCategoryAfterTransformToArray,
    collection_data: selectShopCollectionsData,
    product_type_data: selectShopProductTypeData,
    category_data: selectShopCategoryData,
    // categoryCheckButton: selectShopCategorySearch,
    // productTypeCheckButton: selectShopProductTypeSearch,
})
const mapDispatchToProps = dispatch => ({
    getCollectionsStart: (content) => dispatch(getCollectionsStart(content)),
    handleChkBtnFromSearchStart: (content) => dispatch(handleChkBtnFromSearchStart(content)),
    addItemStart: item => dispatch(addItemStart(item))
})

// this is done so we can provide mapStateToProps individually to each component directly rather than inside shoppage where its not needed
// const CollectionSearchContainer =  connect(mapStateToProps, mapDispatchToProps)(withSpinner(CollectionSearch));
const CollectionSearchContainer = compose(connect(mapStateToProps, mapDispatchToProps), withSpinner)(CollectionSearch);
export default CollectionSearchContainer;
