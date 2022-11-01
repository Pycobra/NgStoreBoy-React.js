import React from 'react';
import { connect } from 'react-redux';
import {useLocation, useNavigate,} from "react-router-dom";
import "./menu-item.styles.css"
import CustomButton from '../custom-button/custom-button.component';
import { ReactComponent as ShoppingCartSvg } from '../../components/asset/shopping-cart1.svg';
import { addItemStart } from '../../redux/cart/cart.action';
import GetPercentageAndPriceDifference  from "../get-percentage-and-price-difference-utils";
import { createStructuredSelector} from "reselect"; 
import { selectCartAddSuccessAlert } from "../../redux/cart/cart.selector";
import Popup from "../popup/popup.component";



// this function is running twice and it args are becoming undefined on the second inexplicable run
// hereby creating issues



const MenuItem = ({name, id, categoryId, categoryUrl, categoryName, itemUrl, images, imageUrl1, imageUrl2, 
    imageUrl3, imageUrl4, imageUrl5, price, discount_price, description, linkUrl,itemData, page, addItemStart, alert, itemDiscountPercent, useID, useClass, itemPriceDifference }) => {
    let navigate = useNavigate()
    let location = useLocation()
    const {discount_percent, price_difference} = GetPercentageAndPriceDifference(itemData)
    const url = images ? images.find(img => img.is_main).url : null
    const OnCardClick = window.onclick = function(event, itemData, location, navigate,
        categoryUrl, categoryId, itemUrl, id) {
        if (itemData !== undefined){
            if (event.target.className === 'card-custom-btn custom-button') {
                return null
            }
            else{
                console.log(location.pathname, 'na him o')
                return Object.keys(itemData).length !== 0 && location.pathname === '/NgStoreBoy-React.js'
                    ?  navigate(`${location.pathname}/items/${categoryUrl}/${categoryId}/${itemUrl}/${id}`)
                    : Object.keys(itemData).length !== 0 && location.pathname !== '/NgStoreBoy-React.js'
                    ?  navigate(`NgStoreBoy-React.js/items/${categoryUrl}/${categoryId}/${itemUrl}/${id}`)
                    : null 
            }
        }
    }

    return (
            <div className={useClass} id={useClass + '-' + id + '-' + useID } onClick={(e) => OnCardClick(e, itemData, location, navigate, categoryUrl, categoryId, itemUrl, id)} >
                {/* {
                     Object.keys(itemData).length !== 0 && location.pathname === '/'
                     ?  () => navigate(`${location.pathname}items/${categoryUrl}/${category_id}/${itemUrl}/${id}`)
                     : Object.keys(itemData).length !== 0 && location.pathname !== '/'
                     ?  () => navigate(`/items/${categoryUrl}/${category_id}/${itemUrl}/${id}`)
                     : null
                }}> */}
                <div className="card-img">
                    {
                    discount_percent !== 100 
                    ? <span>%{parseInt(discount_percent)}</span> 
                    : null
                    }
                    <img src={url} alt={name.toLowerCase()} />
                </div>
                <div className="card-text">
                    <strong className="title">{ name.trim() }</strong>
                    {
                        discount_price
                        ? <span className="money">
                            <div>
                                <strong className="discount">{`N ${ discount_price }`} </strong>
                                <span>save {parseInt(price_difference)}</span>
                            </div>
                            <strike className="price" style={{color:"#ACADA8"}}>N{ price } </strike>
                        </span>
                        : 
                        <div className='block'>
                            <strong  className={ `${discount_price ? "price" : null}` }>N{ price } </strong>
                        </div>
                    }
                </div>
                <CustomButton onClick={() => addItemStart(itemData)} id="home-add-to-cart" style={{backgroundColor:"var(--normalorange)"}} buttonType="isCard"><ShoppingCartSvg /></CustomButton>
            </div>
        )
}


const mapStateToProps = createStructuredSelector({
    alert : selectCartAddSuccessAlert,
    // itemDiscountPercent: selectDiscountPercent,
    // itemPriceDifference: selectPriceDifference,
})

const mapDispatchToProps = dispatch => ({
    addItemStart: item => dispatch(addItemStart(item)),
    // itemDiscountPercent: item => dispatch(getDiscountPercentStart(item)),
    // itemPriceDifference: item => dispatch(getPriceDifferenceStart(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);

































// class MenuItem extends React.Component{
//     render(){
//        const {itemData, page, addItem, itemDiscountPercent, itemPriceDifference, navigate, location} = this.props
//         // let navigate = useNavigate()
//         // let location = useLocation()

//         const {name, id, category_id, categoryUrl, category_name, itemUrl, imageUrl1, imageUrl2, 
//             imageUrl3, imageUrl4, imageUrl5, price, discount_price, description, linkUrl} = itemData
//         const imageUrls = [imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5]
//         const is_main_url = imageUrls.find(img => img.is_main === true)

//         const calc = ((discount_price / price) * 100)
//         const discount_percent = (100 - calc)
//         const price_difference = price - discount_price
//         return (
//                 <div id="menu-item-card" onClick={(e) => TheClick(e, itemData, location, navigate,
//                     categoryUrl, category_id, itemUrl, id)} >
//                     {/* {
//                          Object.keys(itemData).length !== 0 && location.pathname === '/'
//                          ?  () => navigate(`${location.pathname}items/${categoryUrl}/${category_id}/${itemUrl}/${id}`)
//                          : Object.keys(itemData).length !== 0 && location.pathname !== '/'
//                          ?  () => navigate(`/items/${categoryUrl}/${category_id}/${itemUrl}/${id}`)
//                          : null
//                     }}> */}
//                     <div className="card-img">
//                         <span>%{parseInt(discount_percent)}</span>
//                         <img src={is_main_url.url} alt={name.toLowerCase()} />

//                     </div>
//                     <div className="card-text">
//                         <strong className="title">{ name.trim() }</strong>
//                         {
//                             discount_price
//                             ? <span className="money">
//                                 <div>
//                                     <strong className="discount">{`N ${ discount_price }`} </strong>
//                                     <span>save {parseInt(price_difference)}</span>
//                                 </div>
//                                 <strike className="price" style={{color:"#ACADA8"}}>N{ price } </strike>
//                             </span>
//                             : 
//                             <strong  className={ `${discount_price ? "price" : null}` }>N{ price } </strong>
//                         }
//                     </div>
//                     <CustomButton id="home-add-to-cart" style={{backgroundColor:"var(--normalorange)"}} buttonType="isCard"><ShoppingCartSvg /></CustomButton>
//                     {/* <button data-index="{{ i.id }}" className="add-to-cart-btn" value="{{ i.id }}"><i className="fa fa-cart-plus" style={{fontSize:'30px'}}></i></button> */}
//                 </div>
//             ) 
//     }
// }








// {name: 'brown Brim', itemUrl: 'brown-brim', product_type_id: 1, imageUrl1: {…}, imageUrl2: {…}, …}
// categoryUrl: "hats"
// category_id: "1"
// category_name: "Hats"
// description: "aaaa bbb cccc ddddd eeeee ffff gggg"
// discount_price: null
// id: "1"
// imageUrl1: {url: 'https://i.ibb.co/ZYW3VTp/brown-brim.png', is_main: true}
// imageUrl2: {url: undefined, is_main: false}
// imageUrl3: {url: undefined, is_main: false}
// imageUrl4: {url: undefined, is_main: false}
// imageUrl5: {url: undefined, is_main: false}
// is_available: true
// is_visible: true
// itemUrl: "brown-brim"
// name: "brown Brim"
// price: 225
// product_type_id: 1
// [[Prototype]]: Object