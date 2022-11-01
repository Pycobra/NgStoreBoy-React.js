import SHOP_DATA from "./shop-data_bits.js";
import CATEFGORY_DATA from "./category-data2.js";
import PRODUCT_TYPE_DATA from "./product-type-data.js";
import DB_DATA from "./db_data.js";
import { ShopActionTypes } from './shop.types';
import { switchDataSource,
    // handleCheckButton,
    //  revertEmptyDictBackToNull 
    } from './shop.utils';



const INITIAL_STATE = {
    collections_data: SHOP_DATA,
    category_data: CATEFGORY_DATA,
    product_type_data: PRODUCT_TYPE_DATA,
    db_DATA:DB_DATA,
    collections: null,
    isFetching: false,
    isFetchingComponent: false,
    errorMessage: undefined,
    category_search: [],
    product_type_search: [],
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return{
                ...state,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTION_START:
            return{
                ...state,
                isFetching: true,
            }
        case ShopActionTypes.FETCH_CATEGORY_START:
            return{
                ...state,
                isFetching: true,
            }
        case ShopActionTypes.FETCH_PRODUCT_TYPES_START:
            return{
                ...state,
                isFetching: true,
            }
        case ShopActionTypes.FETCHING_COMPONENT_START:
            return{
                ...state,
                isFetchingComponent: true,
            }
        case ShopActionTypes.FETCHING_COMPONENT_SUCCESS:
            return{
                ...state,
                isFetchingComponent: false,
            }
        case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
            return{
                ...state,
                isFetching: false,
                collections_data: switchDataSource(action.payload, state.collections_data),
            }
        case ShopActionTypes.FETCH_CATEGORY_SUCCESS:
            return{
                ...state,
                // isFetching: false,
                category_data: switchDataSource(action.payload, state.category_data),
            }
        case ShopActionTypes.FETCH_PRODUCT_TYPES_SUCCESS:
            return{
                ...state,
                // isFetching: false,
                product_type_data: switchDataSource(action.payload, state.product_type_data),
            }
        case ShopActionTypes.FETCH_COLLECTION_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionTypes.FETCH_CATEGORY_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionTypes.FETCH_PRODUCT_TYPES_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionTypes.GET_COLLECTION_START:
            return{
                ...state,
                isFetching: true,
            }
        case ShopActionTypes.GET_COLLECTION_SUCCESS:
            return{
                ...state,
                isFetching: false,
                // product_type_search: [...state.product_type_search, action.payload.product_type_search],
                // category_search: [...state.category_search, action.payload.category_search],
            }
        case ShopActionTypes.GET_COLLECTION_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // product_type_search: handleCheckButton(state.product_type_search, action.payload, 'product_type'),
                // category_search: handleCheckButton(state.category_search, action.payload, 'category'),
            }
        case ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}
 
export default shopReducer;





