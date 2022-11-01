import AdminActionTypes from "./admin.types"

const INITIAL_STATE = {
    isFetching: false,
    current_pallete: ["account_pallete"],
    currently_clicked_item: undefined,
    currently_clicked_category: undefined,
    currently_clicked_product_type: undefined,
    currently_clicked_user: undefined,
    // account_pallete_active: true,
    // shop_pallete_active: false,
}

const AdminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AdminActionTypes.FETCH_ADMIN_STATE_START:
            return{
                ...state,
                isFetching: true,
            }  
        case AdminActionTypes.FETCH_ADMIN_STATE_SUCCESS:
            return{
                ...state,
                isFetching: false,
                current_pallete: [...state.current_pallete, action.payload.page],
                currently_clicked_item: action.payload.currently_clicked_item,
                currently_clicked_category: action.payload.currently_clicked_category,
                currently_clicked_product_type: action.payload.currently_clicked_product_type,
                currently_clicked_user: action.payload.currently_clicked_user,
            }
        case AdminActionTypes.FETCH_ADMIN_STATE_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }       
        
        default:
            return state
    }
}
 
export default AdminReducer;