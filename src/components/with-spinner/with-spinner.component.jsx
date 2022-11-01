import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styled-component.jsx";
import { useNavigate, useLocation, useParams,} from "react-router-dom";



const withSpinner = (WrappedComponent) => ({isLoading, collectionSearch, ...otherProps}) => {
    const { searchedUrl, searchedId, searchedInputItem } = useParams()
    // console.log(isLoading)
    return isLoading ? (
    <SpinnerOverlay>
        <SpinnerContainer/>
    </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} 
            searchedUrl={searchedUrl} 
            searchedId={searchedId} 
            searchedInputItem={searchedInputItem}  
        />
    )
}
export default withSpinner;




// import React from "react";
// import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styled-component.jsx";
// import { connect } from "react-redux";
// import { selectShopCollectionsData } from "../../redux/shop/shop.selectors";
// import { createStructuredSelector} from "reselect";


// const withSpinner = WrappedComponent => {
//     class withSpinner extends React.Component {
//         constructor(props){
//             super(props)
//         }

//         product_type_list = []
//         name_list = []
//         unique = []
//         unique_product_type = (items, item_id) => {
//             for (const i of items){
//                 this.product_type_list.push(i.product_type)
//                 this.name_list.push({name: i.name, id: i.id, category_id: item_id})
//             }
//             return this.unique =[...new Set(this.product_type_list)]
//         }
//         render(){ 
//             const {isLoading, ...otherProps} = this.props
//             console.log(isLoading)

//             return isLoading ? (
//                 <SpinnerOverlay>
//                     <SpinnerContainer/>
//                 </SpinnerOverlay>
//                 ) : (
//                     <WrappedComponent {...otherProps}/>
//                 )
//             // return <WrappedComponent data={ 
//             //                 forProductType
//             //                 ? this.unique
//             //                 : forName
//             //                 ? this.product_type_list
//             //                 : null
//             //                 } {...otherProps}/>
//         }
//     }
//     return withSpinner;
// }
// const mapStateToProps = createStructuredSelector({
//     collection_data: selectShopCollectionsData,
// })
// export default connect(mapStateToProps)(withSpinner);
