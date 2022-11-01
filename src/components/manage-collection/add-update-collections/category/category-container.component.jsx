import { connect } from 'react-redux';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 
//import CollectionOverview from './collection.component';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import AddCategory from '../../components/manage-collection/add-collection/add-category/add-category.component';


const mapStateToProps = createStructuredSelector ({
    //isLoading: selectIsCollectionFetching
    isLoading: state => !selectIsCollectionFetching(state)
})

const AddCategoryContainer = connect(mapStateToProps)(withSpinner(AddCategory));
export default AddCategoryContainer;
