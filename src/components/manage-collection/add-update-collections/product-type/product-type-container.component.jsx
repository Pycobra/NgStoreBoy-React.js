import { connect } from 'react-redux';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 
//import CollectionOverview from './collection.component';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import AddProductType from '../../components/manage-collection/add-collection/add-product-type/add-product-type.component';


const mapStateToProps = createStructuredSelector ({
    //isLoading: selectIsCollectionFetching
    isLoading: state => !selectIsCollectionFetching(state)
})

const AddProductTypeContainer = connect(mapStateToProps)(withSpinner(AddProductType));
export default AddProductTypeContainer;

