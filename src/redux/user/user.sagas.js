import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
import UserActionTypes from "./user.types"
import { 
    googleProvider,
    auth,
    createUserProfileDocument,
    getCurrentUser } from "../../firebase/firebase.utils"
import {  
    signInFailure, 
    signInSuccess,
    signOutFailure, 
    signOutSuccess,
    signUpFailure, 
    signUpSuccess,
    fetchAllUsersSuccess, 
    fetchAllUsersFailure,

    googleSignInFailure, 
    googleSignInSuccess,
    emailSignInFailure, 
    emailSignInSuccess 
} from "./user.action"


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    // only signup has additionalData, for google signin & email signin, 
    // additionalData wasnt provided so js will see it as undefined
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapShot = yield userRef.get()
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch (error){
       yield put(signInFailure(error.message))
    }
}

export function* getAllUsers(){
    try{
        yield put(fetchAllUsersSuccess())
    } 
    catch (error){
        yield put(fetchAllUsersFailure(error.message))
    }
}

export function* SignUp({payload: {displayName, email, password}}) {
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}))
        
    } catch (error){
       yield put(signUpFailure(error.message))
    }
}

// if my data is on this will sign in the user but still will return an error
export function* SignInAfterSignUp({user, additionalData}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* SignOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error){
       //yield put(emailSignInFailure(error.message))
       yield put(signOutFailure(error.message))
    }
}
export function* signInWithGoogle() {
    // we use try cause every api call has the probability of failing
    try{
        const user = yield auth.signInWithPopup(googleProvider);
        console.log(user)
        yield getSnapshotFromUserAuth(user)
        // const userRef = yield call(createUserProfileDocument, user)
        // const userSnapShot = yield userRef.get()
        // yield put(googleSignInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch (error){
       //yield put(googleSignInFailure(error.message))
       yield put(signInFailure(error.message))
       
    }
}

export function* SignInWithEmail({payload: {email, password}}) {
    // we use try cause every api call has the probability of failing

    try{
        const { user } =  yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
        // const userRef = yield call(createUserProfileDocument, user)
        // const userSnapShot = yield userRef.get()
        // yield put(emailSignInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch (error){
       //yield put(emailSignInFailure(error.message))
       yield put(signInFailure(error.message))
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth =  yield getCurrentUser();
        if (!userAuth) return alert("You are currently not logged in");
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error){
       yield put(signInFailure(error.message))
    }
}



export function* onFetchAllUsersStart() {
    yield takeLatest(UserActionTypes.FETCH_ALL_USERS_START, 
        getAllUsers)
}
export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, 
        isUserAuthenticated)
}
export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, 
        signInWithGoogle)
}
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, 
        SignInWithEmail)
}
export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, 
        SignOut)
}
export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, 
        SignUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, 
        SignInAfterSignUp)
}
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutStart), 
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onFetchAllUsersStart),
        
    ])
}

