import React, { useState, useEffect } from "react";
import "./product-type.styles.css";
import "../../form-styling.styles.css"
import { connect } from "react-redux";
import { selectShopProductTypeData, selectShopProductTypeAfterTransformToArray } from "../../../../redux/shop/shop.selectors";
import { // postProductTypeToFirestoreStart,
    postDataToFirestoreStart} from "../../../../redux/admin/admin.action";
import { //selectClickedProductTypesFromCollections, 
    selectCurrentClickedProductType } from "../../../../redux/admin/admin.selector";
import { createStructuredSelector} from "reselect"; 
import CustomButton from "../../../custom-button/custom-button.component";
import FormInput from "../../../form-input/form-input.component";
import CheckboxInput from "../../../checkbox-input/checkbox-input.component";





//             PRODUCT TYPE FUNCTIONAL COMPONENT                       //

// const ProductType = ({postDataToFirestoreStart, product_type_data_array, 
//     current_clicked_product_type_id, product_type_data, page}) => {
//     const [products, setProducts] = useState({name: "", id: "", url: "", is_active: false, Header: ""})
//     const {name, id, url, is_active, HEADER} = products
//     useEffect(() => {
//         if (page === "UPDATE-PAGE"){
//             const clickedProductTypes = product_type_data_array.find(obj => obj.id === current_clicked_product_type_id)
//             setProducts({
//                 name: clickedProductTypes.name, id: clickedProductTypes.id, url: clickedProductTypes.url, 
//                 is_active: clickedProductTypes.is_active,  HEADER: clickedProductTypes.name
//             })
//         }
//     }, [page, product_type_data_array, current_clicked_product_type_id]
//     )
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         // postProductTypeToFirestoreStart({tableName: 'product types', objectToAdd:{id, name, url, is_active}})
//         postDataToFirestoreStart({tableName: 'product types', objectToAdd:{id, name, url, is_active}})
//         console.log("id         =" + id)
//         console.log("name       =" + name)
//         console.log("url        =" + url)
//         console.log("is_active  =" + is_active)
//     }
//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setProducts({...products, [name]: value})
//     }
//     const handleChangeChkBtn = (e) => {
//         const {name} = e.target;
//         setProducts({...products, [name]: !is_active})
//     }
//     return(
//         <div id="add-category" className="General-Style">
//             <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="inner-form-1">
//                     <div className="rows block-row">
//                         <span className="first">Category Name</span>
//                         <div className="second">
//                             <FormInput type="text"
//                                 inputtype='BigInputType1'
//                                 handleChange={handleChange} 
//                                 value={ name ? name : ''}
//                                 name="name" required/>
//                             <span style={{marginTop:'5px', color:"grey"}}>Required and unique</span>
//                         </div>
//                     </div>
//                     <div className="rows">
//                         <span className="first">Category Safe Url</span>
//                         <FormInput type="text" 
//                             inputtype='BigInputType2'
//                             handleChange={handleChange} 
//                             value={url ? url : ''}
//                             name="url" 
//                             required/>
//                     </div>
//                     <div className="rows">
//                         <CheckboxInput 
//                             handleChange={handleChangeChkBtn} 
//                             checked={is_active}
//                             name="is_active" 
//                             label="Is active"/>
//                      </div> 
//                     <div className="footer">
//                         {page === "UPDATE-PAGE" 
//                         ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
//                         : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
//                     </div>  
//                 </div> 
//             </form>
//         </div>
//     )
// }
// const mapStateToProps = createStructuredSelector({
//     // clicked_product_type_from_collection: selectClickedProductTypesFromCollections,
//     current_clicked_product_type_id: selectCurrentClickedProductType,
//     product_type_data: selectShopProductTypeData,
//     product_type_data_array: selectShopProductTypeAfterTransformToArray
// })
// const mapDispatchToProps = dispatch => ({
//     // postProductTypeToFirestoreStart: productType => dispatch(postProductTypeToFirestoreStart(productType)),
//     postDataToFirestoreStart: productType => dispatch(postDataToFirestoreStart(productType)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(ProductType);














//             PRODUCT TYPE CLASS COMPONENT                       //
// class ProductType extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             id: "",
//             name: "",
//             url: "",
//             is_active: false,
//             HEADER: ""
//         }
//     }

//     componentDidMount(){
//         const { product_type_data_array, current_clicked_product_type_id, product_type_data, page } = this.props
//         if (page === "UPDATE-PAGE"){
//             const clickedProductTypes = product_type_data_array.find(obj => obj.id === current_clicked_product_type_id)
//             this.setState({id: clickedProductTypes.id, name: clickedProductTypes.name,
//                 url: clickedProductTypes.url, is_active: clickedProductTypes.is_active,
//                 HEADER: clickedProductTypes.name})
//         }
//     }
    
//     handleSubmit = async (e) => {
//         e.preventDefault()
//         const { postDataToFirestoreStart } = this.props;
//         const {id, name, url, is_active} = this.state
//         postProductTypeToFirestoreStart({tableName: 'product types', objectToAdd:{id, name, url, is_active}})
//         postDataToFirestoreStart({tableName: 'product types', objectToAdd:{id, name, url, is_active}})
//         console.log(id, name, url, is_active)
//     }
//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value})
//     }
//     handleChangeChkBtn = (e) => {
//         const {is_active} = this.state
//         const {name} = e.target;
//         this.setState({[name]: !is_active})
//     }

//     render(){
//         const { page } = this.props
//         const {id, name, url, is_active, HEADER} = this.state
//         return(
//             <div id="add-product-type" className="General-Style">
//                 <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="inner-form-1">
//                         <div className="rows block-row">
//                             <span className="first">Product Brand Name</span>
//                             <div className="second">
//                                 <FormInput 
//                                     BigInputType1
//                                     handleChange={this.handleChange} 
//                                     value={name ? name : ""} 
//                                     type="text" name="name" 
//                                     required/>
//                                 <span style={{marginTop:'5px', color:"grey"}}>Required and unique</span>
//                             </div>
//                         </div>
//                         <div className="rows">
//                             <span className="first">Brand Url</span>
//                             <FormInput 
//                                 BigInputType2
//                                 handleChange={this.handleChange}  
//                                 type="text" 
//                                 value={url ? url : ""}
//                                 name="url" required/>
//                         </div>
//                         <div className="rows">
//                             <CheckboxInput 
//                                 handleChange={this.handleChangeChkBtn} 
//                                 checked={is_active}
//                                 name="is_active" 
//                                 label="Is active"/>
//                          </div>   
//                         {/* <div className="footer"><CustomButton buttonType="isCategoryAdd">Delete</CustomButton ><CustomButton buttonType="isCategoryAdd2">Save</CustomButton ></div> */}
//                     </div>
//                     {/* <div className="inner-form-2 ">
//                         <h1>Product Specification</h1>
//                         <div className="spec-head"><span>Name</span><span>Delete</span></div>
//                         <div className="spec-input">
//                             <div className="rows"><input /></div>
//                             <div className="rows"><input /></div>
//                             <div className="rows"><input /></div>
//                         </div>
//                     </div> */}
//                     <div className="footer">
//                         {page === "UPDATE-PAGE" 
//                         ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
//                         : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// const mapStateToProps = createStructuredSelector({
//     // clicked_product_type_from_collection: selectClickedProductTypesFromCollections,
//     current_clicked_product_type_id: selectCurrentClickedProductType,
//     product_type_data: selectShopProductTypeData,
//     product_type_data_array: selectShopProductTypeAfterTransformToArray
// })
// const mapDispatchToProps = dispatch => ({
//     // postProductTypeToFirestoreStart: productType => dispatch(postProductTypeToFirestoreStart(productType)),
//     postDataToFirestoreStart: productType => dispatch(postDataToFirestoreStart(productType)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(ProductType);


















//             PRODUCT TYPE CLASS COMPONENT                       //
class ProductType extends React.Component{
    constructor(){
        super()
        this.state = {
            id: "",
            name: "",
            url: "",
            is_active: false,
            HEADER: ""
        }
    }

    componentDidMount(){
        const { product_type_data_array, current_clicked_product_type_id, product_type_data, page } = this.props
        if (page === "UPDATE-PAGE"){
            const clickedProductTypes = product_type_data_array.find(obj => obj.id === current_clicked_product_type_id)
            this.setState({id: clickedProductTypes.id, name: clickedProductTypes.name,
                url: clickedProductTypes.url, is_active: clickedProductTypes.is_active,
                HEADER: clickedProductTypes.name})
        }
    }
    
    handleSubmit = async (e) => {
        e.preventDefault()
        const { postDataToFirestoreStart, postProductTypeToFirestoreStart } = this.props;
        const {id, name, url, is_active} = this.state
        // postProductTypeToFirestoreStart({tableName: 'product types', objectToAdd:{id, name, url, is_active}})
        postDataToFirestoreStart({tableName: 'product types', objectToAdd:{id, name, url, is_active}})
        console.log("id         =" + id)
        console.log("name       =" + name)
        console.log("url        =" + url)
        console.log("is_active  =" + is_active)
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    handleChangeChkBtn = (e) => {
        const {is_active} = this.state
        const {name} = e.target;
        this.setState({[name]: !is_active})
    }

    render(){
        const { page } = this.props
        const {id, name, url, is_active, HEADER} = this.state
        return(
            <div id="add-product-type" className="General-Style">
                <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="inner-form-1">
                        <div className="rows block-row">
                            <span className="first">Product Brand Name</span>
                            <div className="second">
                                <FormInput 
                                    inputtype='BigInputType1'
                                    handleChange={this.handleChange} 
                                    value={ name ? name : ''}
                                    name="name" required/>
                                <span style={{marginTop:'5px', color:"grey"}}>Required and unique</span>
                            </div>
                        </div>
                        <div className="rows">
                            <span className="first">Brand Url</span>
                            <FormInput 
                                inputtype='BigInputType2'
                                handleChange={this.handleChange} 
                                value={url ? url : ''}
                                name="url" 
                                required/>
                        </div>
                        <div className="rows">
                            <CheckboxInput 
                                handleChange={this.handleChangeChkBtn} 
                                checked={is_active}
                                name="is_active" 
                                label="Is active"/>
                         </div>   
                    </div>
                    <div className="footer">
                        {page === "UPDATE-PAGE" 
                        ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
                        : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    // clicked_product_type_from_collection: selectClickedProductTypesFromCollections,
    current_clicked_product_type_id: selectCurrentClickedProductType,
    product_type_data: selectShopProductTypeData,
    product_type_data_array: selectShopProductTypeAfterTransformToArray
})
const mapDispatchToProps = dispatch => ({
    // postProductTypeToFirestoreStart: productType => dispatch(postProductTypeToFirestoreStart(productType)),
    postDataToFirestoreStart: productType => dispatch(postDataToFirestoreStart(productType)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductType);









