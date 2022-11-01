import React from "react";
import Header1 from "./header-1/header-1.component";
import Header2 from "./header-2/header-2.component";
import Header3 from "./header-3/header-3.component";
import Header4 from "./header-4/header-4.component";
import CartDropdown from "../cart/cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import "./header.styles.css";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { signOutStart } from "../../redux/user/user.action";
import { connect } from "react-redux";

const Header = ({hidden}) => ( 
    <div className="header">
        <Header1 />
        <Header2 />
        <Header3 />
        <Header4 />
        { hidden ? null : <CartDropdown /> }
    </div>
)

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
   signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);


