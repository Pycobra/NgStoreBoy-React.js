import { takeLatest, all, call, put } from "redux-saga/effects"
import {FirebaseActionTypes} from "./firebase-redux.types"
import { firestore, 
    convertCollectionsSnapshotToMap,
    convertCategorySnapshotToMap} from "../../firebase/firebase.utils"
import {  
    fetchFirebaseNetworkStatusFailure, 
    fetchFirebaseNetworkStatusSuccess,
} from "./firebase-redux.action"
import {  
    fetchCollectionsFailure, 
    fetchCollectionsSuccess,
    fetchCategoryFailure, 
    fetchCategorySuccess,
} from "../shop/shop.action"


export function* fetchFirebaseNetworkStartAsync() {
    // try{
    //     const collectionRef = firestore.collection('collections')
    //     const collectionSnapShot = yield collectionRef.get()
    //     const collectionsMap = yield call(convertCollectionsSnapshotToMap, collectionSnapShot)
    //     yield put(fetchFirebaseNetworkStatusSuccess(collectionsMap))
    // } catch (error){
    //     yield put(fetchFirebaseNetworkStatusFailure(error.message))
    // }
    try{
        const collectionRef = firestore.collection('categories')
        const collectionSnapShot = yield collectionRef.get()
        const collectionsMap = yield call(convertCategorySnapshotToMap, collectionSnapShot)
        yield put(fetchFirebaseNetworkStatusSuccess(collectionsMap))
    } catch (error){
        yield put(fetchFirebaseNetworkStatusFailure(error.message))
    }
}

export function* onFetchFirebaseNetworkStartAsync() {
    yield takeLatest(FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_START, 
        fetchFirebaseNetworkStartAsync)
}

export function* firebaseSagas(){
    yield all([ 
        call( onFetchFirebaseNetworkStartAsync),
    ])
}


