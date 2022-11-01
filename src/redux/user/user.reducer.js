import UserActionTypes from "./user.types"
import USER_DATA from "./user-data"

const INITIAL_STATE = {
    userData: USER_DATA,
    currentUser: null,
    errorMessage: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }            
        case UserActionTypes.FETCH_ALL_USERS_START:
            return{
                ...state,
            }
        case UserActionTypes.FETCH_ALL_USERS_SUCCESS:
            return{
                ...state,
                userData: state.userData,
                errorMessage: null
            }
        case UserActionTypes.FETCH_ALL_USERS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                errorMessage: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                errorMessage: null
            }
        case UserActionTypes.SIGN_OUT_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                errorMessage: null
            }
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }
        
        default:
            return state
    }
}
 
export default userReducer;