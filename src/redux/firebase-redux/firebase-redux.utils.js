// import SHOP_DATA from "./shop-data_bits.js.js";
// import CATEFGORY_DATA from "./category-data2.js.js";
// import PRODUCT_TYPE_DATA from "./product-type-data.js.js";

export const getNetworkStatus = (actionPayload) => {
        const payload = typeof actionPayload
        if (payload === 'object'){
            return Object.keys(actionPayload).length === 0 ? false : true
        }
        return false
}
    



