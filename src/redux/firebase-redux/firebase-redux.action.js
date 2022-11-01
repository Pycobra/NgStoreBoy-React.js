import {FirebaseActionTypes} from "./firebase-redux.types"

export const fetchFirebaseNetworkStatusStart = (content) => ({
    type: FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_START,
    payload: content
})
export const fetchFirebaseNetworkStatusSuccess = (content) => ({
    type: FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_SUCCESS,
    payload: content
})
export const fetchFirebaseNetworkStatusFailure = errorMessage => ({
    type: FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_FAILURE,
    payload: errorMessage
})

