import React from "react";
import { connect } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import "./admin-page.styles.css";
import CollectionPallete from "../../components/manage-collection/collection-pallete/collection-pallete.component";
import withSpinner from '../../components/with-spinner/with-spinner.component';
// import { fetchCollectionsStart } from '../../redux/shop/shop.action';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 



// const CollectionPalleteWithSpinner = withSpinner(withCollectionData(CollectionPallete))
const CollectionPalleteWithSpinner = withSpinner(CollectionPallete)
class AdminSection extends React.Component {
  
    componentDidMount(){
        window.scrollTo(0, 0)
        // const { fetchCollectionsStart } = this.props
        //  fetchCollectionsStart()
      }

    render(){ 
    const { isCollectionFetching } = this.props

    return (<section id="admin-section">
        <div className="head-place">
            <h1 className="head-content">Admin</h1>
        </div>
        <Routes>        
            <Route 
            index 
            element={<CollectionPalleteWithSpinner isLoading={isCollectionFetching} />} 
            />
        </Routes>
    </section> 
    )
}
}
const mapStateToProps = createStructuredSelector ({
    isCollectionFetching: selectIsCollectionFetching,
    // isCollectionLoaded: selectIsCollectionLoaded
})
const mapDispatchToProps = dispatch => ({
    //  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
})
export default connect(mapStateToProps, mapDispatchToProps)(AdminSection);

