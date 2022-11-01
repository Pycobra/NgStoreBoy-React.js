import React from "react";
import "./custom-button.styles.css";


const CustomButton = ({children, buttonType, ...otherProps}) => {
    
    return (

    <button className={`${
          (buttonType === "CartCustomBtn") ? "cart-custom-btn" 
        : (buttonType === "navSearchCustomBtn") ? "nav-search-custom-btn" 
        : (buttonType === "navSearchCustomBtn2") ? "nav-search-custom-btn2"
        : (buttonType === "isEmailSignIn") ? "email-signin-custom-btn" 
        : (buttonType === "isGoogleSignIn") ? "google-signin-custom-btn" 
        : (buttonType === "isEmailSignUp") ? "email-signup-custom-btn" 
        : (buttonType === "isGoogleSignUp") ? "googlestart-signup-custom-btn" 
        : (buttonType === "isSearchPageLaptop") ? "search-page-laptop-custom-btn" 
        : (buttonType === "isSearchPageMobile") ? "search-page-mobile-custom-btn" 
        : (buttonType === "isSingleCollectionPage") ? "single-collection-custom-btn"  
        : (buttonType === "isAdminPage") ? "admin-custom-btn"    
        : (buttonType === "isAdminAdd") ? "admin-add-custom-btn"    
        : (buttonType === "isAdminAdd2") ? "admin-add-custom-btn2" 
        : (buttonType === "isCard") ? "card-custom-btn"
        : (buttonType === "FooterCustomBtn") ? "footer-custom-btn"
        : (buttonType === "DeliveryCustomBtn1") ? "delivery-custom-btn1"
        : (buttonType === "DeliveryCustomBtn2") ? "delivery-custom-btn2"
        : (buttonType === "MenuSlideBar") ? "side-bar-btn"
        : (buttonType === "pay") ? "pay-custom-btn"
        : ''} custom-button`} {...otherProps}>
        { children }
    </button>
)}
export default CustomButton;