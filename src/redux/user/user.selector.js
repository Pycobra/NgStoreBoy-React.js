import { createSelector } from "reselect";

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectUserData = createSelector(
    [selectUser],
    (user) => user.userData
)

// export const selectClickedUser = createSelector(
//     [selectShop],
//     shop => shop.collections_data.find(obj => obj.id === shop.current_category_id)
//                         .items.find(itm => itm.id === shop.current_clicked_id)
//  )
// export const selectCartItemsCount = createSelector(
//     [selectCurrentUser],
//     (user) => (
//         cartItem.reduce(
//             (accumulatedQuantity, cartItemz) => 
//             accumulatedQuantity + cartItemz.quantity, 
//             0
//         )
//     )
// )