import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
import UserActionTypes from "./admin.types"
import { 
    googleProvider,
    auth,
    postCollectionDocument } from "../../firebase/firebase.utils"
import { fetchAdminStateSuccess, 
    fetchAdminStateFailure, 
    postCategoryToFirestoreSuccess,
    postCategoryToFirestoreFailure,
    postProductTypeToFirestoreSuccess,
    postProductTypeToFirestoreFailure,
    postItemToFirestoreSuccess,
    postItemToFirestoreFailure,
    postAccountFirestoreSuccess,
    postAccountFirestoreFailure,
    postDataToFirestoreSuccess,
    postDataToFirestoreFailure } from "./admin.action"
import AdminActionTypes from "./admin.types"



export function* getAdminPalleteState({payload}) {
    try{
        yield put(fetchAdminStateSuccess(payload))
    } catch (error){
        yield put(fetchAdminStateFailure(error.message))
    }
}
export function* postCategoryFirebaseStartAsync({payload}) {
    console.log(payload)
    try{
        yield put(postCategoryToFirestoreSuccess(payload))
    } catch (error){
        yield put(postCategoryToFirestoreFailure(error.message))
    }
}
export function* postCategoryFirebaseSuccessAsync({payload}) {
    console.log(payload)
    try{
        yield call(postCollectionDocument, payload)
    } catch (error){
        yield put(postCategoryToFirestoreFailure(error.message))
    }
}
export function* postProductTypeFirebaseStartAsync({payload}) {
    console.log(payload)
    try{
        yield put(postProductTypeToFirestoreSuccess(payload))
    } catch (error){
        yield put(postProductTypeToFirestoreFailure(error.message))
    }
}
export function* postProductTypeFirebaseSuccessAsync({payload}) {
    console.log(payload)
    try{
        yield call(postCollectionDocument, payload)
    } catch (error){
        yield put(postProductTypeToFirestoreFailure(error.message))
    }
}
export function* postItemFirebaseStartAsync({payload}) {
    console.log(payload)
    try{
        yield put(postItemToFirestoreSuccess(payload))
    } catch (error){
        yield put(postItemToFirestoreFailure(error.message))
    }
}
export function* postItemFirebaseSuccessAsync({payload}) {
    console.log(payload)
    try{
        yield call(postCollectionDocument, payload)
    } catch (error){
        yield put(postItemToFirestoreFailure(error.message))
    }
}
export function* postAccountFirebaseStartAsync({payload}) {
    console.log(payload)
    try{
        yield put(postAccountFirestoreSuccess(payload))
    } catch (error){
        yield put(postAccountFirestoreFailure(error.message))
    }
}
export function* postAccountFirebaseSuccessAsync({payload}) {
    console.log(payload)
    try{
        yield call(postCollectionDocument, payload)
    } catch (error){
        yield put(postAccountFirestoreFailure(error.message))
    }
}

export function* postDataFirebaseStartAsync({payload}) {
    console.log(payload)
    try{
        yield put(postDataToFirestoreSuccess(payload))
    } catch (error){
        yield put(postDataToFirestoreFailure(error.message))
    }
}
export function* postDataFirebaseSuccessAsync({payload}) {
    console.log(payload)
    try{
        yield call(postCollectionDocument, payload)
    } catch (error){
        yield put(postDataToFirestoreFailure(error.message))
    }
}
export function* onGetAccountPalleteState() {
    yield takeLatest(AdminActionTypes.FETCH_ADMIN_STATE_START, 
        getAdminPalleteState)
}
export function* onPostCategoryToFirebaseStart() {
    yield takeLatest(AdminActionTypes.POST_CATEGORY_TO_FIRESTORE_START, 
        postCategoryFirebaseStartAsync)
}
export function* onPostCategoryToFirebaseSuccess() {
    yield takeLatest(AdminActionTypes.POST_CATEGORY_TO_FIRESTORE_SUCCESS, 
        postCategoryFirebaseSuccessAsync)
}

export function* onPostAccountToFirebaseStart() {
    yield takeLatest(AdminActionTypes.POST_ACCOUNT_TO_FIRESTORE_START, 
        postAccountFirebaseStartAsync)
}
export function* onPostAccountToFirebaseSuccess() {
    yield takeLatest(AdminActionTypes.POST_ACCOUNT_TO_FIRESTORE_SUCCESS, 
        postAccountFirebaseSuccessAsync)
}

export function* onPostProductTypeToFirebaseStart() {
    yield takeLatest(AdminActionTypes.POST_PRODUCT_TYPE_TO_FIRESTORE_START, 
        postProductTypeFirebaseStartAsync)
}
export function* onPostProductTypeToFirebaseSuccess() {
    yield takeLatest(AdminActionTypes.POST_PRODUCT_TYPE_TO_FIRESTORE_SUCCESS, 
        postProductTypeFirebaseSuccessAsync)
}

export function* onPostItemToFirebaseStart() {
    yield takeLatest(AdminActionTypes.POST_ITEM_TO_FIRESTORE_START, 
        postItemFirebaseStartAsync)
}
export function* onPostItemToFirebaseSuccess() {
    yield takeLatest(AdminActionTypes.POST_ITEM_TO_FIRESTORE_SUCCESS, 
        postItemFirebaseSuccessAsync)
}

export function* onPostDataToFirebaseStart() {
    yield takeLatest(AdminActionTypes.POST_DATA_TO_FIRESTORE_START, 
        postDataFirebaseStartAsync)
}
export function* onPostDataToFirebaseSuccess() {
    yield takeLatest(AdminActionTypes.POST_DATA_TO_FIRESTORE_SUCCESS, 
        postDataFirebaseSuccessAsync)
}
export function* adminSagas(){
    yield all([
        call(onGetAccountPalleteState),
        call(onPostCategoryToFirebaseStart),
        call(onPostCategoryToFirebaseSuccess),
        call(onPostDataToFirebaseStart),
        call(onPostDataToFirebaseSuccess),
        call(onPostProductTypeToFirebaseStart),
        call(onPostProductTypeToFirebaseSuccess),
        call(onPostItemToFirebaseStart),
        call(onPostItemToFirebaseSuccess),
        call(onPostAccountToFirebaseStart),
        call(onPostAccountToFirebaseSuccess),
    ])
}






















