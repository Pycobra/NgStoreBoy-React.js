import {combineReducers} from "redux"
import userReducer from "./user/user.reducer"
import cartReducer from "./cart/cart.reducer"
import shopReducer from "./shop/shop.reducer"
import adminReducer from "./admin/admin.reducer"
import firebaseReducer from "./firebase-redux/firebase-redux.reducer"
import directoryReducer from "./directory/directory.reducer"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"



const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart',]
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
    admin: adminReducer,
    firebase: firebaseReducer
})

export default persistReducer(persistConfig, rootReducer);

// former content 
// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// })



