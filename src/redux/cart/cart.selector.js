import { createSelector } from "reselect";

const selectCart = state => state.cart

//const selectUser = state => state.user

export const selectCartItems = createSelector(
    // [selectCart, selectUser],
    // (cart, user) => cart.cartItemz
    [selectCart],
    (cart) => cart.cartItemz
)

export const selectCartItemsCount = createSelector(
    // [selectCart, selectUser],
    // (cart, user) => cart.cartItemz
    [selectCartItems],
    (cartItem) => (
        // reduce() iterates
        // on first iteration 0 is passed into accumulatedObject
        cartItem.reduce(
            (accumulatedQuantity, cartItemz) => 
            accumulatedQuantity + cartItemz.quantity, 
            0
        )
    )
)
export const selectCartAddSuccessAlert = createSelector(
    // [selectCart, selectUser],
    // (cart, user) => cart.cartItemz
    [selectCart],
    (cart) => cart.alert
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartTotal = createSelector(
    // [selectCart, selectUser],
    // (cart, user) => cart.cartItemz
    [selectCartItems],
    (cartItem) => (
        cartItem.reduce(
            (accumulatedQuantity, cartItemz) => 
            // accumulatedQuantity + cartItemz.total, 
            cartItemz.discount_price ? accumulatedQuantity + cartItemz.quantity * cartItemz.discount_price :
            accumulatedQuantity + cartItemz.quantity * cartItemz.price, 
            0
        )
        )
)
