import AdminActionTypes from "./admin.types"

export const fetchAdminStateStart = (content) => ({
    type: AdminActionTypes.FETCH_ADMIN_STATE_START,
    payload: content
})
export const fetchAdminStateSuccess = (content) => ({
    type: AdminActionTypes.FETCH_ADMIN_STATE_SUCCESS,
    payload: content
})
export const fetchAdminStateFailure = errorMessage => ({
    type: AdminActionTypes.FETCH_ADMIN_STATE_FAILURE,
    payload: errorMessage
})
export const postCategoryToFirestoreStart = (content) => ({
    type: AdminActionTypes.POST_CATEGORY_TO_FIRESTORE_START,
    payload: content
})
export const postCategoryToFirestoreSuccess = (content) => ({
    type: AdminActionTypes.POST_CATEGORY_TO_FIRESTORE_SUCCESS,
    payload: content
})
export const postCategoryToFirestoreFailure = errorMessage => ({
    type: AdminActionTypes.POST_CATEGORY_TO_FIRESTORE_FAILURE,
    payload: errorMessage
})
export const postProductTypeToFirestoreStart = (content) => ({
    type: AdminActionTypes.POST_PRODUCT_TYPE_TO_FIRESTORE_START,
    payload: content
})
export const postProductTypeToFirestoreSuccess = (content) => ({
    type: AdminActionTypes.POST_PRODUCT_TYPE_TO_FIRESTORE_SUCCESS,
    payload: content
})
export const postProductTypeToFirestoreFailure = errorMessage => ({
    type: AdminActionTypes.POST_PRODUCT_TYPE_TO_FIRESTORE_FAILURE,
    payload: errorMessage
})
export const postAccountToFirestoreStart = (content) => ({
    type: AdminActionTypes.POST_ACCOUNT_TO_FIRESTORE_START,
    payload: content
})
export const postAccountFirestoreSuccess = (content) => ({
    type: AdminActionTypes.POST_ACCOUNT_TO_FIRESTORE_SUCCESS,
    payload: content
})
export const postAccountFirestoreFailure = errorMessage => ({
    type: AdminActionTypes.POST_ACCOUNT_TO_FIRESTORE_FAILURE,
    payload: errorMessage
})
export const postItemToFirestoreStart = (content) => ({
    type: AdminActionTypes.POST_ITEM_TO_FIRESTORE_START,
    payload: content
})
export const postItemToFirestoreSuccess = (content) => ({
    type: AdminActionTypes.POST_ITEM_TO_FIRESTORE_SUCCESS,
    payload: content
})
export const postItemToFirestoreFailure = errorMessage => ({
    type: AdminActionTypes.POST_ITEM_TO_FIRESTORE_FAILURE,
    payload: errorMessage
})
export const postDataToFirestoreStart = (content) => ({
    type: AdminActionTypes.POST_ITEM_TO_FIRESTORE_START,
    payload: content
})
export const postDataToFirestoreSuccess = (content) => ({
    type: AdminActionTypes.POST_ITEM_TO_FIRESTORE_SUCCESS,
    payload: content
})
export const postDataToFirestoreFailure = errorMessage => ({
    type: AdminActionTypes.POST_ITEM_TO_FIRESTORE_FAILURE,
    payload: errorMessage
})

