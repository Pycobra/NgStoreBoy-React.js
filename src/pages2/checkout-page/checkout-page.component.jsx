import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./checkout-page.styles.css";
import { createStructuredSelector } from "reselect";
import withSpinner from '../../components/with-spinner/with-spinner.component';
import Checkout from "../../components/checkout/checkout.component.jsx";
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';


const CheckoutWithSpinner = withSpinner(Checkout)
class CheckoutPage extends React.Component {
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    render(){ 
        const { isCollectionFetching } = this.props

        return (
            <section id="checkout-page">
                <Routes>        
                    <Route 
                    index 
                    element={<CheckoutWithSpinner isLoading={isCollectionFetching} />} 
                    />
                </Routes>
            </section>)
    }
}
const mapStateToProps = createStructuredSelector ({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
})
export default connect(mapStateToProps)(CheckoutPage);
