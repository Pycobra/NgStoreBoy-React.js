import { createSelector } from "reselect";

const selectAdmin = state => state.admin

export const selectCurrentPallete = createSelector(
    [selectAdmin],
    (admin) => admin.current_pallete[admin.current_pallete.length - 1]
)
export const selectlastPage = createSelector(
    [selectAdmin],
    (admin) => admin.current_pallete[admin.current_pallete.length - 2]
)
 export const selectCurrentClickedItem = createSelector(
    [selectAdmin],
    admin => admin.currently_clicked_item
)
export const selectCurrentClickedProductType = createSelector(
    [selectAdmin],
    admin => admin.currently_clicked_product_type
)
export const selectCurrentClickedCategory = createSelector(
    [selectAdmin],
    admin => admin.currently_clicked_category
)
export const selectCurrentClickedUser = createSelector(
    [selectAdmin],
    admin => admin.currently_clicked_user
)




