import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector} from "reselect"; 
import { Link, renderMatches } from "react-router-dom";
import "./header-1.styles.css";
import { selectShopCategoryAfterTransformToArray } from "../../../redux/shop/shop.selectors";
// import { selectShopCategoryData} from "../../../redux/shop/shop.selectors";


const Header1 = ({category_data_array}) => { 
        return (
            <div className="header-1">
                <div className="main-box">
                    <Link className="sellpage" to="/sell-page">Sell&nbsp;On&nbsp;NGStoreBoy</Link>
                    <div className="options">
                        {category_data_array.map(obj => (
                            <Link key={obj.id} className="option" to={`/search/${obj.url}/${obj.id}`}>
                                {obj.name}
                            </Link>))}
                        {/* {category_data.map(obj => (
                            <div key={obj.id} className="option" to='/shop'>
                                {obj.name}
                            </div>))} */}
                    </div>
                </div>
            </div>
)}
const mapStateToProps = createStructuredSelector({
    category_data_array: selectShopCategoryAfterTransformToArray,
})
export default connect(mapStateToProps)(Header1);
