import { ShopActionTypes } from "./shop.types"
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"


export const UpdateCollections = ( collectionsMap ) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
})
export const fetchCategoryStart = () => ({
    type: ShopActionTypes.FETCH_CATEGORY_START
})
export const fetchProductTypesStart = () => ({
    type: ShopActionTypes.FETCH_PRODUCT_TYPES_START
})
export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
})
export const fetchCategorySuccess = categoryMap => ({
    type: ShopActionTypes.FETCH_CATEGORY_SUCCESS,
    payload: categoryMap
})
export const fetchProductTypesSuccess = productTypeMap => ({
    type: ShopActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
    payload: productTypeMap
})
export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})
export const fetchCategoryFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_CATEGORY_FAILURE,
    payload: errorMessage
})
export const fetchProductTypesFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_PRODUCT_TYPES_FAILURE,
    payload: errorMessage
})
export const getCollectionsStart = (content) => ({
    type: ShopActionTypes.GET_COLLECTION_START,
    payload: content
})
export const getCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.GET_COLLECTION_SUCCESS,
    payload: collectionsMap
})
export const getCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.GET_COLLECTION_FAILURE,
    payload: errorMessage
})
// export const getDiscountPercentStart = (obj) => ({
//     type: ShopActionTypes.GET_DISCOUNT_PERCENT_START,
//     payload: obj
// })
// export const getDiscountPercentSuccess = (obj) => ({
//     type: ShopActionTypes.GET_DISCOUNT_PERCENT_SUCCESS,
//     payload: obj
// })
// export const getDiscountPercentFailure = (errorMessage) => ({
//     type: ShopActionTypes.GET_DISCOUNT_PERCENT_FAILURE,
//     payload: errorMessage
// })
// export const getPriceDifferenceStart = (obj) => ({
//     type: ShopActionTypes.GET_PRICE_DIFFERENCE_START,
//     payload: obj
// })
// export const getPriceDifferenceSuccess = (obj) => ({
//     type: ShopActionTypes.GET_PRICE_DIFFERENCE_SUCCESS,
//     payload: obj
// })
// export const getPriceDifferenceFailure = (errorMessage) => ({
//     type: ShopActionTypes.GET_PRICE_DIFFERENCE_FAILURE,
//     payload: errorMessage
// })
export const handleChkBtnFromSearchStart = (obj) => ({
    type: ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_START,
    payload: obj
})
export const handleChkBtnFromSearchSuccess = (obj) => ({
    type: ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_SUCCESS,
    payload: obj
})
export const handleChkBtnFromSearchFailure = (errorMessage) => ({
    type: ShopActionTypes.HANDLE_CHECK_BTN_FROM_SEARCH_FAILURE,
    payload: errorMessage
})


//not in use
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef =firestore.collection('collections')
        dispatch(fetchCollectionsStart())

        collectionRef
            .get()
            .then(snapShot =>  {
                const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
                dispatch(fetchCollectionsSuccess(collectionsMap))
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    
    }
}
