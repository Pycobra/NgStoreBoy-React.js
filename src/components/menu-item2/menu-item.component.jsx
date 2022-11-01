import React from 'react';
import { connect } from 'react-redux';
import {useLocation, useNavigate,} from "react-router-dom";
import "./menu-item.styles.css"
import CustomButton from '../custom-button/custom-button.component';
import { ReactComponent as ShoppingCartSvg } from '../../components/asset/shopping-cart1.svg';
import { addItem } from '../../redux/cart/cart.action';
// import { getDiscountPercentStart, getPriceDifferenceStart } from '../../redux/shop/shop.action';
// import { selectDiscountPercent, selectPriceDifference } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 




// var ButtonIsClicked = undefined
// window.onclick = function(event) {
//     if (event.target.id === "home-add-to-cart") {
//         // console.log(true, event)
//         return ButtonIsClicked = true
//     } else {
//         // console.log(false, event)
//         return ButtonIsClicked = false
//     }
// }

// function ButtonIsClickedss(event) {
//     if (event.target.id === "home-add-to-cart") {
//         console.log(true, event)
//         return true
//     } else {
//         console.log(false, event)
//         return false
//     }
// };

//const btn = document.querySelector('#home-add-to-cart')
// const btn = document.getElementById('home-add-to-cart')
// btn.addEventListener('click', () => {
//     console.log("ssssssssssssssssss  ssssssssss  sssssss")
// })





const TheClick = window.onclick = function(event, itemData, location, navigate,
    categoryUrl, category_id, itemUrl, id) {
    if (event.target.className == 'card-custom-btn custom-button') {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
        return null
    }
    else{
        console.log(itemData, 11111)
        console.log(location, navigate, 22222)
        console.log(categoryUrl, category_id, 33333)
        console.log(itemUrl, id, 44444)
        return Object.keys(itemData).length !== 0 && location.pathname === '/'
            ?  () => navigate(`${location.pathname}items/${categoryUrl}/${category_id}/${itemUrl}/${id}`)
            : Object.keys(itemData).length !== 0 && location.pathname !== '/'
            ?  () => navigate(`/items/${categoryUrl}/${category_id}/${itemUrl}/${id}`)
            : null
    }
    
}

const MenuItem = ({itemData, page, addItem, itemDiscountPercent, itemPriceDifference }) => {
    let navigate = useNavigate()
    let location = useLocation()
    // console.log(itemData[1])
    // const {name, id, itemUrl, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, price, discount_price, description, linkUrl} = itemData[0]
    // const {category_id, category_url} = itemData[1]

    const {name, id, category_id, categoryUrl, category_name, itemUrl, imageUrl1, imageUrl2, 
        imageUrl3, imageUrl4, imageUrl5, price, discount_price, description, linkUrl} = itemData
    const imageUrls = [imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5]
    const is_main_url = imageUrls.find(img => img.is_main === true)

    const calc = ((discount_price / price) * 100)
    const discount_percent = (100 - calc)
    const price_difference = price - discount_price
}


const mapStateToProps = createStructuredSelector({
    // itemDiscountPercent: selectDiscountPercent,
    // itemPriceDifference: selectPriceDifference,
})

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    // itemDiscountPercent: item => dispatch(getDiscountPercentStart(item)),
    // itemPriceDifference: item => dispatch(getPriceDifferenceStart(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);


