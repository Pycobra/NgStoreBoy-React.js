import { createSelector } from "reselect";
import { selectFirebaseNetwork, selectFirebaseNetwork2 } from "../firebase-redux/firebase-redux.selectors";
// import {networkSTATUS} from "./shop.utils"


// selectShop / all selectss will be called twice once app runs = holding the initial data
// then run twice again once fetchCollection starts = holding the initial data again
// then run twice again when fetchCollection success = this time holding the firebase data if it exists

const selectShop = state => state.shop
export const selectShopCollectionsData = createSelector(
    [selectShop, selectFirebaseNetwork],
    (shop, networkStatus) => {
        // var create_id = 0
        Object.keys(shop.collections_data).map(cat_key => {
            try {
                console.log(shop.collections_data[cat_key])
                shop.collections_data[cat_key]['categoryId'] = `${cat_key}`
                shop.collections_data[cat_key]['categoryName'] = shop.category_data[cat_key].name
                shop.collections_data[cat_key]['items'].map((itm, idx) => {
                    itm['categoryId'] = cat_key
                    itm['categoryName'] = shop.category_data[cat_key].name
                    itm['categoryUrl'] = shop.category_data[cat_key].url
                    itm['id'] = idx
                    itm['productTypeName'] = shop.product_type_data[itm.productTypeId].name
                    itm['productTypeUrl'] = shop.product_type_data[itm.productTypeId].url
                    // if (!networkStatus){
                    //     itm['productTypeName'] = shop.product_type_data[itm.brandId].name
                    //     itm['productTypeUrl'] = shop.product_type_data[itm.brandId].url
                    //     itm['id'] = create_id
                    //     create_id ++
                    // } else {
                    //     itm['productTypeName'] = shop.product_type_data[itm.productTypeId].name
                    //     itm['productTypeUrl'] = shop.product_type_data[itm.productTypeId].url
                    // }
                })
            } catch(e){
                return
            }

        })
        console.log(shop.collections_data)
        return shop.collections_data
    }
)
export const selectShopCategoryData = createSelector(
    [selectShop, selectFirebaseNetwork],
    (shop, networkStatus) => {
        if (!networkStatus){
            Object.keys(shop.category_data).map(cat_key => {
                shop.category_data[cat_key]['id'] = `${cat_key}`
                const parentId = shop.category_data[cat_key].parent
                if (parentId){
                    const grandParentId = shop.category_data[parentId].parent
                    shop.category_data[cat_key]['parentName'] = shop.category_data[parentId].name
                    shop.category_data[cat_key]['parentUrl'] = shop.category_data[parentId].url
                    if (grandParentId){
                        shop.category_data[cat_key]['grandParentName'] = shop.category_data[grandParentId].name
                        shop.category_data[cat_key]['grandParentUrl'] = shop.category_data[grandParentId].url
                    }
                
                }
                else {
                    // shop.category_data[cat_key]['parentName'] = ""
                    // shop.category_data[cat_key]['parentUrl'] = ""
                    // shop.category_data[cat_key]['grandParentName'] = ""
                    // shop.category_data[cat_key]['grandParentUrl'] = ""
                }
            })
        }
        return shop.category_data
    }
)
export const selectShopProductTypeData = createSelector(
    [selectShop, selectFirebaseNetwork],
    (shop, networkStatus) => {
        // console.log(shop.product_type_data)
        if (!networkStatus){
            Object.keys(shop.product_type_data).map(prod_key => shop.product_type_data[prod_key]['id'] = prod_key)
        }
        return shop.product_type_data
    }
)
export const selectShopCollectionAfterTransformToArray = createSelector(
    [selectShopCollectionsData],
    (collections_data) => Object.keys(collections_data).map(cat_key => collections_data[cat_key])
)
export const selectShopCategoryAfterTransformToArray = createSelector(
    [selectShopCategoryData],
    (category_data) => Object.keys(category_data).map(cat_key => category_data[cat_key])
)
export const selectShopProductTypeAfterTransformToArray = createSelector(
    [selectShopProductTypeData],
    (product_type_data) =>  Object.keys(product_type_data).map(item_type_key => product_type_data[item_type_key])
)
export const selectShopProductTypeSearch = createSelector(
    [selectShop],
    (shop) => shop.product_type_search
)
export const selectShopCategorySearch = createSelector(
    [selectShop],
    (shop) => shop.category_search
)
export const selectShopCollectionsAfterTransformToArray = createSelector(
    [selectShopCollectionsData],
    (collections) => collections ? Object.keys(collections).reverse().map(key => collections[key]) : []
)
export const selectSingleShopCollection = (categoryIdParam, collectionIdParam) => createSelector(
    [selectShopCollectionsData],
    (collections_data) => {
        var id = null
        try{
            id = parseInt(collectionIdParam)
        } catch{
            id = collectionIdParam
        }
        //const id = parseInt(collectionIdParam) //only use if the id given at firebase.utils is numeric if its in a number/letter format remove this
        return collections_data[categoryIdParam]['items'].find(itm => itm.id === id)
})
export const selectSingleShopCategory = (categoryIdParam) => createSelector(
   [selectShopCategoryData],
   category_data => {
        const parentId = category_data[categoryIdParam].parent
        if (parentId){
            const grandParentId = category_data[parentId].parent
            if (grandParentId){
                return [category_data[grandParentId], category_data[parentId]]
            }
            return [category_data[parentId]]
        }
        return [category_data[categoryIdParam]]
   }
)
 export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
 )
 export const selectIsFetchingComponent = createSelector(
    [selectShop],
    shop => shop.isFetchingComponent
 )
 export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
 )


















//=====================================================================================
const selectShop2 = state => state.shop
export const selectShopCollectionsData2 = createSelector(
    [selectShop2, selectFirebaseNetwork2],
    (shop, networkStatus) => {
        console.log(networkStatus) 
        // console.log(shop.category_data)
        // const hold = Object.keys(shop.collections_data).map(cat_key => {
        //     const a = Object.keys(shop.category_data).map(key => {
        //         // console.log(category_data[key]['uniqueId'], cat_key) 
        //         return shop.category_data[key]['uniqueId'] === cat_key ? shop.collections_data[cat_key]['categoryId'] = key : null 
        //     })
        //     const b = Object.keys(shop.product_type_data).map(key => {
        //         const c = shop.collections_data[cat_key]['items'].map(itm => {
        //             // console.log(product_type_data[key]['uniqueId'], itm['brandId']) 
        //             return shop.product_type_data[key]['uniqueId'] === itm['brandId'] ? itm['productTypeId'] = key : null
        //         })
        //     })
        // })
        return shop.db_DATA
    }
)

export const selectShopCategoryData2 = createSelector(
    [selectShop2, selectFirebaseNetwork2],
    (shop, networkStatus) => {
        console.log(networkStatus) 
        return shop.category_data
    }
)
export const selectShopProductTypeData2 = createSelector(
    [selectShop2, selectFirebaseNetwork2],
    (shop, networkStatus) => {
        console.log(networkStatus) 
        return shop.product_type_data
    }
)

//=====================================================================================

export const selectShopCollectionArrayToFirebase = createSelector(
    [selectShopCollectionsData2],
    (collections_data) =>  {
        return Object.keys(collections_data).map(cat_key => collections_data[cat_key])} 

)
// export const selectShopCategoryArrayToFirebase = createSelector(
//     [selectShopCategoryData],
//     (category_data) => Object.keys(category_data).map(cat_key => {
//                             category_data[cat_key]['uniqueId'] = cat_key
//                             return category_data[cat_key]
//                         })
// )
// export const selectShopProductTypeArrayToFirebase = createSelector(
//     [selectShopProductTypeData],
//     (product_type_data) => Object.keys(product_type_data).map(item_type_key => {
//                             product_type_data[item_type_key]['uniqueId'] = item_type_key
//                             return product_type_data[item_type_key]
//                         })
// )

