import SHOP_DATA from "./shop-data_bits.js";





// export const handleCheckButton = (stateChkBtnSearch, actionPayload, chkBtnType) => {

//     if (chkBtnType === 'category') {
//         var newStateChkBtnSearch = stateChkBtnSearch.filter(itm => itm !== actionPayload.category_search)
//         return actionPayload.doWhat === 'REMOVE' 
//         ? [ ...newStateChkBtnSearch ]
//         : actionPayload.doWhat === 'APPEND' 
//         ? [ ...stateChkBtnSearch, actionPayload.category_search ] 
//         : null 
//     }
//     if (chkBtnType === 'product_type') {
//         var newStateChkBtnSearch = stateChkBtnSearch.filter(itm => itm !== actionPayload.product_type_search)
//         return actionPayload.doWhat === 'REMOVE' 
//         ? [ ...newStateChkBtnSearch ]
//         : actionPayload.doWhat === 'APPEND' 
//         ? [ ...stateChkBtnSearch, actionPayload.product_type_search ] 
//         : null 
//     }
// }
// export const revertEmptyDictBackToNull = (actionPayload) => {
export const switchDataSource = (actionPayload, stateJsonDATA) => {
    const payload = typeof actionPayload
    if (payload === 'object'){
        return Object.keys(actionPayload).length === 0 
        ? stateJsonDATA : actionPayload
    }
    return stateJsonDATA
}
// export const networkSTATUS = () => {
//         const payload = typeof actionPayload
//         if (payload === 'object'){
//             return Object.keys(actionPayload).length === 0 ? false : true
//         }
//         return false
//     }
    









export const get_search_data = (collection_data_array, product_type_data_array, category_data_array, 
    collection_Data, category_Data, product_type_Data, categoryCheckButton, productTypeCheckButton, 
    searchedUrl, searchedId, searchedInputItem, location, navigate) => {

    const filtered_category = categoryCheckButton.filter(obj => obj !== undefined)
    const filtered_productType = productTypeCheckButton.filter(obj => obj !== undefined)

    
    const collection_data = collection_Data
    const product_type_data = product_type_Data
    const category_data = category_Data
    var matched_search = []
    var breadCrumb_list = []
    if (filtered_category.length !== 0 || filtered_productType.length !== 0){
        var categorySearchList = []
        var productSearchList = []
        var categoryBreadCrumbList = []
        var productBreadCrumbList = []
        if (filtered_category.length !== 0){
            filtered_category.filter(chkbtn_cat_id =>  {
                categoryBreadCrumbList.push(category_data[chkbtn_cat_id].name)
                collection_data[`${chkbtn_cat_id}`].items.map(itm => {
                if (chkbtn_cat_id){itm['categoryId'] = chkbtn_cat_id}
                categorySearchList.push(itm)
                if (filtered_productType.length !== 0){
                    filtered_productType.map(prod_id =>  {
                        if (itm.brandId === prod_id){
                            productBreadCrumbList.push(itm.name)
                            return productSearchList.push(itm)
                            }
                        })
                    }
                })
            })
        } else {
            filtered_productType.map(prod_id =>  {
                Object.keys(collection_data).map(cat_id => {
                    collection_data[`${cat_id}`].items.map(itm => {
                        if (itm.brandId === prod_id){
                            productBreadCrumbList.push(itm.name)
                            return productSearchList.push(itm)
                        }
                    })

                })
            })
        }
        filtered_productType.length !== 0 ? matched_search = productSearchList : matched_search = categorySearchList
        filtered_productType.length !== 0 ? breadCrumb_list = productBreadCrumbList : breadCrumb_list = categoryBreadCrumbList
    }
    else {
        var categoryData = []
        var productTypeData = []
        var breadCrumbListCategories = []
        var breadCrumbListProductType = []
        var breadCrumbListProduct = []

        // (1) THIS BLOCK SEARCHES CATEGORY_DATA IF USER CLICKS OR INPUTS A CATEGORY
        //     (1a) TO RETURN CATEGORY ID IF USER LINK URL SEARCH IS IN CATEGORY DATA
        if (searchedId && searchedUrl){categoryData.push(searchedId)} 
        //     (1b) TO RETURN CATEGORY ID IF A USER INPUT SEARCH IS IN CATEGORY DATA
        else{categoryData = Object.keys(category_data).filter(cat_id => {
            if (searchedInputItem !== undefined){
                const searchLenght = searchedInputItem.length
                const objName = category_data[cat_id].name.slice(0, searchLenght)
                return objName.toLowerCase() === searchedInputItem.toLowerCase()
            }
        })}
        //     (1c) TO GET ALL THE COLLECTION DATA MATCHING ID'S IN SEARCH FROM CATEGORY DATA
        if (categoryData.length !== 0) {
            categoryData.map(chkbtn_cat_id => {
                console.log(chkbtn_cat_id)
                breadCrumbListCategories.push(category_data[`${chkbtn_cat_id}`].name.toLowerCase())
                collection_data[`${chkbtn_cat_id}`].items
                    .map(itm => {
                        if (chkbtn_cat_id){itm['categoryId'] = chkbtn_cat_id}
                        matched_search.push(itm)
                    })
            })
        }
        if (searchedInputItem !== undefined){
        //(2) THIS BLOCK TAKES CARE IF USER INPUT SEARCH MATCHES A PRODUCT TYPE DATA
        //    (2a) TO RETURN PRODUCT TYPE ID'S TO SEARCH FOR
            productTypeData = Object.keys(product_type_data).filter(type_id => {
                const searchLenght = searchedInputItem.length
                const objName = product_type_data[type_id].name.slice(0, searchLenght)
                return objName.toLowerCase() === searchedInputItem.toLowerCase()
            })
            // console.log(productTypeData)
        //    (2b) TO GET ALL THE COLLECTION DATA MATCHING ID'S IN SEARCH FROM PRODUCT TYPE DATA
            if (productTypeData.length !== 0) {
                productTypeData.map(chkbtn_cat_id => {
                    breadCrumbListProductType.push(product_type_data[`${chkbtn_cat_id}`].name.toLowerCase())
                    Object.keys(collection_data).map(cat_id => {
                        return collection_data[`${cat_id}`].items.map(itm => {
                            return itm.brandId === chkbtn_cat_id
                            ? matched_search.push(itm)
                            : null
                        })
                    })
                })
            }
        //(3) THIS BLOCK TAKES CARE IF USER INPUT SEARCH DOESNT MATCHES A PRODUCT TYPE & CATEGORY DATA
        // BUT MATCHES A NAME OF A PRODUCT
            // Object.keys(collection_data).map(cat_id => {
            //     Object.keys(collection_data[`${cat_id}`].items).map(itm_id => {
            //         collection_data[`${cat_id}`].items[`${itm_id}`]['id'] = itm_id
            //         collection_data[`${cat_id}`].items[`${itm_id}`]['category_id'] = cat_id
            //         return collection_data[`${cat_id}`].items[`${itm_id}`]
            //     }).filter(obj => {
            //         if (searchedId && searchedUrl){
            //             return toString(obj.id) === toString(searchedId) && obj.url === searchedUrl}
            //         else if (searchedInputItem){
            //             const searchLenght = searchedInputItem.length
            //             const objName = obj.name.slice(0, searchLenght)
            //             return objName.toLowerCase() === searchedInputItem.toLowerCase()}
            //     }).map(obj => {
            //         breadCrumbListProduct.push(obj.name.toLowerCase())
            //         return matched_search.push(obj)
            //     })
            // })
            Object.keys(collection_data).map(cat_id => {
                collection_data[`${cat_id}`].items.map(itm => {
                    // console.log(itm)
                    if (!itm['categoryId']){
                        return itm['categoryId']}
                    return itm
                }).filter(obj => {
                    if (searchedId && searchedUrl){
                        return obj.id === searchedId && obj.url === searchedUrl}
                    else if (searchedInputItem){
                        // console.log(obj)
                        const searchLenght = searchedInputItem.length
                        const objName = obj.name.slice(0, searchLenght)
                        return objName.toLowerCase() === searchedInputItem.toLowerCase()
                    }
                }).map(obj => {
                    breadCrumbListProduct.push(obj.name.toLowerCase())
                    return matched_search.push(obj)
                })
            })
        }
        
    }

    var breadCrumb_list2 =[...new Set(breadCrumb_list)]
    var breadCrumbListCategories2 =[...new Set(breadCrumbListCategories)]
    var breadCrumbListProductType2 =[...new Set(breadCrumbListProductType)]
    var breadCrumbListProduct2 =[...new Set(breadCrumbListProduct)]
    return [matched_search, breadCrumb_list2, breadCrumbListCategories2, breadCrumbListProductType2, 
        breadCrumbListProduct2]
}




















// export const get_search_data = (collection_data_array, product_type_data_array, category_data_array, 
//     collection_data, category_data, product_type_data, categoryCheckButton, productTypeCheckButton, 
//     searchedUrl, searchedId, searchedInputItem, location, navigate) => {

//     const filtered_category = categoryCheckButton.filter(obj => obj !== undefined)
//     const filtered_productType = productTypeCheckButton.filter(obj => obj !== undefined)
    
//     var matched_search = []
//     var breadCrumb_list = []
//     if (filtered_category.length !== 0 || filtered_productType.length !== 0){
//         var categorySearchList = []
//         var productSearchList = []
//         var categoryBreadCrumbList = []
//         var productBreadCrumbList = []
//         // filtered_category.filter(chkbtn_cat_id =>  {
//         //     categoryBreadCrumbList.push(category_data[chkbtn_cat_id].name)
//         //     Object.keys(collection_data[`${chkbtn_cat_id}`]['items']).map(itm_id => {
//         //         collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`]['id'] = itm_id
//         //         if (chkbtn_cat_id){collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`]['category_id'] = chkbtn_cat_id}
//         //         categorySearchList.push(collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`])
//         //         if (filtered_productType.length !== 0){
//         //             const sin = filtered_productType.map(prod_id =>  {
//         //                 if (collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`].product_type_id === parseInt(prod_id)){
//         //                     productBreadCrumbList.push(collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`].name)
//         //                     return productSearchList.push(collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`])
//         //                 }
//         //             })
//         //         }
//         //     })
//         // })
//         filtered_category.filter(chkbtn_cat_id =>  {
//             categoryBreadCrumbList.push(category_data[chkbtn_cat_id].name)
//             collection_data[`${chkbtn_cat_id}`].items.map(itm => {
//             if (chkbtn_cat_id){itm['category_id'] = chkbtn_cat_id}
//             categorySearchList.push(itm)
//             if (filtered_productType.length !== 0){
//                 const sin = filtered_productType.map(prod_id =>  {
//                     if (itm.product_type_id === parseInt(prod_id)){
//                         productBreadCrumbList.push(itm.name)
//                         return productSearchList.push(itm)
//                         }
//                     })
//                 }
//             })
//         })
//         filtered_productType.length !== 0 ? matched_search = productSearchList : matched_search = categorySearchList
//         filtered_productType.length !== 0 ? breadCrumb_list = productBreadCrumbList : breadCrumb_list = categoryBreadCrumbList
//     }
//     else {
//         var categoryData = []
//         var productTypeData = []
//         var breadCrumbListCategories = []
//         var breadCrumbListProductType = []
//         var breadCrumbListProduct = []

//         // (1) THIS BLOCK SEARCHES CATEGORY_DATA IF USER CLICKS OR INPUTS A CATEGORY
//         //     (1a) TO RETURN CATEGORY ID IF USER LINK URL SEARCH IS IN CATEGORY DATA
//         if (searchedId && searchedUrl){categoryData.push(searchedId)} 
//         //     (1b) TO RETURN CATEGORY ID IF A USER INPUT SEARCH IS IN CATEGORY DATA
//         else{categoryData = Object.keys(category_data).filter(cat_id => {
//             if (searchedInputItem !== undefined){
//                 const searchLenght = searchedInputItem.length
//                 const objName = category_data[cat_id].name.slice(0, searchLenght)
//                 return objName.toLowerCase() === searchedInputItem.toLowerCase()
//             }
//         })}
//         //     (1c) TO GET ALL THE COLLECTION DATA MATCHING ID'S IN SEARCH FROM CATEGORY DATA
//         if (categoryData.length !== 0) {
//             categoryData.map(chkbtn_cat_id => {
//                 breadCrumbListCategories.push(category_data[`${chkbtn_cat_id}`].name.toLowerCase())
//                 // Object.keys(collection_data[`${chkbtn_cat_id}`]['items'])
//                 //     .map(itm_id => {
//                 //         collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`]['id'] = itm_id
//                 //         if (chkbtn_cat_id){collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`]['category_id'] = chkbtn_cat_id}
//                 //         matched_search.push(collection_data[`${chkbtn_cat_id}`]['items'][`${itm_id}`])
//                 //     })
//                 collection_data[`${chkbtn_cat_id}`].items
//                     .map(itm => {
//                         if (chkbtn_cat_id){itm['category_id'] = chkbtn_cat_id}
//                         matched_search.push(itm)
//                     })
//             })
//         }
//         if (searchedInputItem !== undefined){
//         //(2) THIS BLOCK TAKES CARE IF USER INPUT SEARCH MATCHES A PRODUCT TYPE DATA
//         //    (2a) TO RETURN PRODUCT TYPE ID'S TO SEARCH FOR
//             productTypeData = Object.keys(product_type_data).filter(type_id => {
//                 const searchLenght = searchedInputItem.length
//                 const objName = product_type_data[type_id].brand_name.slice(0, searchLenght)
//                 return objName.toLowerCase() === searchedInputItem.toLowerCase()
//             })
//         //    (2b) TO GET ALL THE COLLECTION DATA MATCHING ID'S IN SEARCH FROM PRODUCT TYPE DATA
//             if (productTypeData.length !== 0) {
//                 productTypeData.map(chkbtn_cat_id => {
//                     breadCrumbListProductType.push(product_type_data[`${chkbtn_cat_id}`].brand_name.toLowerCase())
//                     Object.keys(collection_data).map(cat_id => {
//                         // return Object.keys(collection_data[`${cat_id}`]['items']).map(itm_id => {
//                         //     return collection_data[`${cat_id}`]['items'][`${itm_id}`].product_type_id === parseInt(chkbtn_cat_id)
//                         //     ? matched_search.push(collection_data[`${cat_id}`]['items'][`${itm_id}`])
//                         //     : null
//                         // })
//                         return collection_data[`${cat_id}`].items.map(itm => {
//                             return itm.product_type_id === parseInt(chkbtn_cat_id)
//                             ? matched_search.push(itm)
//                             : null
//                         })
//                     })
//                 })
//             }
//         //(3) THIS BLOCK TAKES CARE IF USER INPUT SEARCH DOESNT MATCHES A PRODUCT TYPE & CATEGORY DATA
//         // BUT MATCHES A NAME OF A PRODUCT
//             // Object.keys(collection_data).map(cat_id => {
//             //     Object.keys(collection_data[`${cat_id}`].items).map(itm_id => {
//             //         collection_data[`${cat_id}`].items[`${itm_id}`]['id'] = itm_id
//             //         collection_data[`${cat_id}`].items[`${itm_id}`]['category_id'] = cat_id
//             //         return collection_data[`${cat_id}`].items[`${itm_id}`]
//             //     }).filter(obj => {
//             //         if (searchedId && searchedUrl){
//             //             return toString(obj.id) === toString(searchedId) && obj.url === searchedUrl}
//             //         else if (searchedInputItem){
//             //             const searchLenght = searchedInputItem.length
//             //             const objName = obj.name.slice(0, searchLenght)
//             //             return objName.toLowerCase() === searchedInputItem.toLowerCase()}
//             //     }).map(obj => {
//             //         breadCrumbListProduct.push(obj.name.toLowerCase())
//             //         return matched_search.push(obj)
//             //     })
//             // })
//             Object.keys(collection_data).map(cat_id => {
//                 collection_data[`${cat_id}`].items.map(itm => {
//                     itm['category_id'] = cat_id
//                     return itm
//                 }).filter(obj => {
//                     if (searchedId && searchedUrl){
//                         return toString(obj.id) === toString(searchedId) && obj.url === searchedUrl}
//                     else if (searchedInputItem){
//                         const searchLenght = searchedInputItem.length
//                         const objName = obj.name.slice(0, searchLenght)
//                         return objName.toLowerCase() === searchedInputItem.toLowerCase()}
//                 }).map(obj => {
//                     breadCrumbListProduct.push(obj.name.toLowerCase())
//                     return matched_search.push(obj)
//                 })
//             })
//         }
        
//     }

//     var breadCrumbListCategories2 =[...new Set(breadCrumbListCategories)]
//     var breadCrumbListProductType2 =[...new Set(breadCrumbListProductType)]
//     var breadCrumbListProduct2 =[...new Set(breadCrumbListProduct)]
//     return [matched_search, breadCrumbListCategories2, breadCrumbListProductType2, 
//         breadCrumbListProduct2]
// }