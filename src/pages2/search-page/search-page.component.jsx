import React, { useEffect } from "react";
import { connect } from "react-redux";
// import CollectionSearch  from "../../components/collection-search/collection-search2.component.";
import { Routes, Route } from "react-router-dom";
import "./search-page.styles.css";
import withSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 
import CollectionSearchContainer from "../../components/collection-search/collection-search-container.component";
import { useNavigate, useLocation, useParams,} from "react-router-dom";



const SearchPage = ({isCollectionFetching}) => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <section id="search-page">
            <Routes>           
                <Route 
                index
                element={<CollectionSearchContainer location={location} navigate={navigate} isLoading={isCollectionFetching} />} 
                // element={<CollectionSearch location={location} navigate={navigate} isLoading={isCollectionFetching} />} 
                />          
                <Route 
                path=":searchedInputItem" 
                element={<CollectionSearchContainer location={location} navigate={navigate} isLoading={isCollectionFetching} />} 
                // element={<CollectionSearch location={location} navigate={navigate} isLoading={isCollectionFetching} />} 
                />          
                <Route 
                path={`:searchedUrl/:searchedId`}
                element={<CollectionSearchContainer location={location} navigate={navigate} isLoading={isCollectionFetching} />} 
                // element={<CollectionSearch location={location} navigate={navigate} isLoading={isCollectionFetching} />} 
                />
            </Routes>
        </section>
    )
}
const mapStateToProps = createStructuredSelector ({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
})
export default connect(mapStateToProps)(SearchPage);


// const CollectionSearchWithSpinner = withSpinner(CollectionSearch)
// class SearchPage extends React.Component {
//       render(){
//         const location = useLocation()
//         const navigate = useNavigate()
//         const params = useParams()
//         const { isCollectionFetching } = this.props
//         return (
//             <section id="search-page">
//                 <Routes>           
//                     <Route 
//                     index
//                     element={<CollectionSearchContainer location={location} navigate={navigate} params={params} isLoading={isCollectionFetching} />} 
//                     />          
//                     <Route 
//                     path=":searchedInputItem" 
//                     element={<CollectionSearchContainer location={location} navigate={navigate} params={params} isLoading={isCollectionFetching} />} 
//                     />          
//                     <Route 
//                     path={`:searchedUrl/:searchedId`}
//                     element={<CollectionSearchContainer location={location} navigate={navigate} params={params} isLoading={isCollectionFetching} />} 
//                     />
//                 </Routes>
//             </section>
//         )
//     }
// }
// const mapStateToProps = createStructuredSelector ({
//     isCollectionFetching: selectIsCollectionFetching,
//     isCollectionLoaded: selectIsCollectionLoaded
// })
// export default connect(mapStateToProps)(SearchPage);

