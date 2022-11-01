
import {FirebaseActionTypes} from './firebase-redux.types';
import { getNetworkStatus } from './firebase-redux.utils.js';


const INITIAL_STATE = {
    firebaseNetworkStatus: false,
    isFetching: false,
}

const firebaseReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_START:
            return{
                ...state,
                isFetching: false,
            }
        case FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_SUCCESS:
            return{
                ...state,
                isFetching: false,
                firebaseNetworkStatus: getNetworkStatus(action.payload),
            }
        case FirebaseActionTypes.FETCH_FIREBASE_NETWORK_STATUS_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}
 
export default firebaseReducer;