import React from "react";
import { connect } from "react-redux";
import "./item-page.styles.css";
import SingleCollection from "../../components/single-collection/single-collection.components"
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import { Routes, Route } from "react-router-dom";
import "./item-page.styles.css";
import withSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 



const SingleCollectionWithSpinner = withSpinner(SingleCollection)
class ItemPage extends React.Component {
      render(){ 
        const { isCollectionFetching } = this.props

            return (
                <section id="items-page">
                <Routes>           
                    <Route 
                    path=":categoryUrl/:categoryId/:collectionUrl/:collectionId" 
                    element={<SingleCollectionWithSpinner isLoading={isCollectionFetching} />} 
                        />
                </Routes>
                </section>)
    }
}
const mapStateToProps = createStructuredSelector ({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
})
export default connect(mapStateToProps)(ItemPage);

