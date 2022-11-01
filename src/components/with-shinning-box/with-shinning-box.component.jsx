import React from "react";
import { CardContainer, CardOverlay, CardContent } from "../with-shinning-box/with-shinning-box.styled-component.jsx";
import { ReactComponent as ShoppingCartSvg } from '../../components/asset/shopping-cart3.svg';



const WithShinningBox = (WrappedComponent) => ({isLoading, ...otherProps}) => {
    // const { searchedUrl, searchedId, searchedInputItem } = useParams()
    // console.log(isLoading)
    
    return isLoading ? (
    <CardOverlay>
        <CardContainer><CardContent><ShoppingCartSvg/></CardContent></CardContainer>
    </CardOverlay>
    ) : (
        <WrappedComponent {...otherProps}/>
    )
}
export default WithShinningBox;

