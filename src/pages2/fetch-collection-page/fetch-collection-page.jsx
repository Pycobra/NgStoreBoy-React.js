import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector} from "reselect"; 
import { Routes, Route } from "react-router-dom";
import withSpinner from '../../components/with-spinner/with-spinner.component';
import Homepage from "../homepage/homepage.component";
import ItemPage from "../item-page/item-page.component";
import './fetch-collection-page.styles.css'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStart, 
    fetchCategoryStart, 
    fetchProductTypesStart } from '../../redux/shop/shop.action.js';
import { auth, createUserProfileDocument, addCollectionAndDocument } from '../../firebase/firebase.utils'

import { selectShopCollectionArrayToFirebase,
    // selectShopProductTypeArrayToFirebase,
    // selectShopCategoryArrayToFirebase 
  } from '../../redux/shop/shop.selectors.js';


// const HomePageWithSpinner = withSpinner(Homepage)
// const ItemPageWithSpinner = withSpinner(ItemPage)
// const FetchCollectionPage = (isCollectionFetching) => {
//     return(
//         <div id="fetch-collection-page">
//             <Routes>           
//                 <Route 
//                 index
//                 element={<HomePageWithSpinner isLoading={isCollectionFetching} />} 
//                 />           
//                 <Route 
//                 path='/items/*'
//                 element={<ItemPageWithSpinner isLoading={isCollectionFetching} />} 
//                 />
//             </Routes>
//         </div>
//         )
// }
// const mapStateToProps = createStructuredSelector ({
//     isCollectionFetching: selectIsCollectionFetching,
// })
// export default connect(mapStateToProps)(FetchCollectionPage);









const HomePageWithSpinner = withSpinner(Homepage)
const ItemPageWithSpinner = withSpinner(ItemPage)
class FetchCollectionPage extends React.Component {
  
    componentDidMount(){
        window.scrollTo(0, 0)
        const { isCollectionFetching, 
            fetchCategoryStart, fetchProductTypesStart, fetchCollectionsStart, collection_data_toFirebase  } = this.props        
        // fetchCategoryStart()
        // fetchProductTypesStart()
        // fetchCollectionsStart()
        // addCollectionAndDocument('collections', collection_data_toFirebase)
    }

    render(){ 
    const { isCollectionFetching } = this.props
    return(
        <div id="fetch-collection-page">
            <Routes>           
                <Route 
                index
                // element={<Homepage isLoading={isCollectionFetching} />}
                element={<HomePageWithSpinner isLoading={isCollectionFetching} />} 
                />           
                <Route 
                path='NgStoreBoy-React.js/items/*'
                element={<ItemPageWithSpinner />}
                // element={<ItemPageWithSpinner isLoading={isCollectionFetching} />} 
                />
            </Routes>
        </div>
    )
}
}
const mapStateToProps = createStructuredSelector ({
    isCollectionFetching: selectIsCollectionFetching,
  collection_data_toFirebase: selectShopCollectionArrayToFirebase,
  // product_type_data_toFirebase: selectShopProductTypeArrayToFirebase,
  // category_data_toFirebase: selectShopCategoryArrayToFirebase,
})
const mapDispatchToProps = dispatch => ({
    fetchCategoryStart: () => dispatch(fetchCategoryStart()),
    fetchProductTypesStart: () => dispatch(fetchProductTypesStart()),
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
})
export default connect(mapStateToProps, mapDispatchToProps)(FetchCollectionPage);

