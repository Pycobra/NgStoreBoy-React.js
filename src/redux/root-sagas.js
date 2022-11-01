import { call, all } from "redux-saga/effects"
import { shopSagas } from "./shop/shop.sagas"
import { userSagas } from "./user/user.sagas"
import { cartSagas } from "./cart/cart.sagas"
import { adminSagas } from "./admin/admin.sagas"
import { firebaseSagas } from "./firebase-redux/firebase-redux.sagas"


// call is a command to call function instead of calling by ourselve else.g fetchCollectionsStart()
// all is similar to takevery, it make all saga run concurrently each time its called...
//...else if each saga is writen one by one with yield, rootSaga ll folow d normal generator func behaviour
export default function* rootSaga(){
    yield all([
        call(shopSagas), 
        call(userSagas), 
        call(cartSagas),
        call(adminSagas),
        call(firebaseSagas),
    ])
}
