import UserActionTypes from "./user.types"


export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})
export const fetchAllUsersStart = () => ({
    type: UserActionTypes.FETCH_ALL_USERS_START
})
export const fetchAllUsersSuccess = (data) => ({
    type: UserActionTypes.FETCH_ALL_USERS_SUCCESS,
    payload: data
})
export const fetchAllUsersFailure = errorMessage => ({
    type: UserActionTypes.FETCH_ALL_USERS_FAILURE,
    payload: errorMessage
})
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
})
export const googleSignInSuccess = user => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})
export const googleSignInFailure = errorMessage => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: errorMessage
})
export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})
export const emailSignInSuccess = user => ({
    type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
})
export const emailSignInFailure = errorMessage => ({
    type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: errorMessage
})

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})
export const signInFailure = errorMessage => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: errorMessage
}) 
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})
export const signOutFailure = errorMessage => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: errorMessage
})
export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
}) 
export const signUpStart = userCredentials => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})
export const signUpFailure = errorMessage => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: errorMessage
})
export const signUpSuccess = ({user, additionalData}) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
    
})
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})
