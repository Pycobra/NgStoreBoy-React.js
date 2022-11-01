import React, { useState, useEffect } from "react";
import "./category.styles.css";
import "../../form-styling.styles.css"
import { connect } from "react-redux";

import { selectCurrentClickedCategory } from "../../../../redux/admin/admin.selector";
import { // postCategoryToFirestoreStart,
    postDataToFirestoreStart } from "../../../../redux/admin/admin.action";
import { //selectClickedCategory, 
    selectShopCategoryData, selectShopCategoryAfterTransformToArray } from "../../../../redux/shop/shop.selectors";
import { createStructuredSelector} from "reselect"; 
import CustomButton from "../../../custom-button/custom-button.component";
import FormInput from "../../../form-input/form-input.component";
import FormSelect from "../../../form-select/form-select.component";
import CheckboxInput from "../../../checkbox-input/checkbox-input.component";







//             CATEGORY FUNCTIONAL COMPONENT                       //

const Category = ({page, postDataToFirestoreStart, current_clicked_category, 
    category_data, category_data_array}) => {
    const [categories, setCategories] = useState({
                    name: "", id: "", url: "", parentId: "", parentName:"",
                    parent: "", is_active: false, parentUrl: "", Header: ""
                })
    const {name, id, url, parent, parentName, parentUrl, is_active, HEADER} = categories
    useEffect(() => {
        if (page === "UPDATE-PAGE"){
            const clickedCategory = category_data_array.find(obj => obj.id === current_clicked_category)
            const parent_name = category_data_array.find(obj => obj.id === clickedCategory.parent)
            setCategories({
                name: clickedCategory.name, id: clickedCategory.id, url: clickedCategory.url, 
                parent: clickedCategory.parent, is_active: clickedCategory.is_active, parentName: parent_name ? parent_name.name : null,
                parentUrl: clickedCategory.parentUrl, HEADER: clickedCategory.name
            })
        }
    }, [page, category_data_array, current_clicked_category]
    )
    const handleSubmit = async (e) => {
        var type = "UPDATE"
        if (page !== "UPDATE-PAGE")type = "POST"
        e.preventDefault()
        // postCategoryToFirestoreStart({tableName: 'categories', objectToAdd:{ id, name, url, parent, is_active}})
        postDataToFirestoreStart({tableName: 'categories', action:type, objectToAdd:{ id, name, url, parent, is_active}})
        console.log("id         =" + id)
        console.log("name       =" + name)
        console.log("url        =" + url)
        console.log("parent     =" + parent)
        console.log("parentName     =" + parentName)
        console.log("parentUrl     =" + parentUrl)
        console.log("is_active  =" + is_active)
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategories({...categories, [name]: value})
    }
    const handleChangeChkBtn = (e) => {
        const {name} = e.target;
        setCategories({...categories, [name]: !is_active})
    }    
    const handleSelectChange = (e) => {
        const {name, value} = e.target;
        const childrens = e.target.children
        const itemContent = Array.from(childrens).find(itm => itm.innerText === value)
        setCategories({...categories, [name]: value, parent: itemContent.id})
    }
    return(
        <div id="add-category" className="General-Style">
            <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
            <form onSubmit={handleSubmit}>
                <div className="inner-form-1">
                    <div className="rows block-row">
                        <span className="first">Category Name</span>
                        <div className="second">
                            <FormInput type="text"
                                inputtype='BigInputType1'
                                handleChange={handleChange} 
                                value={ name ? name : ''}
                                name="name" required/>
                            <span style={{marginTop:'5px', color:"grey"}}>Required and unique</span>
                        </div>
                    </div>
                    <div className="rows">
                        <span className="first">Category Safe Url</span>
                        <FormInput type="text" 
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={url ? url : ''}
                            name="url" 
                            required/>
                    </div>
                    <div className="rows grey-row">
                        <span className="first">Parent</span>
                        {/* <FormInput type="text"  
                            inputtype='MidInputType'
                            handleChange={handleChange} 
                            value={parent ? parent : ""}
                            name="parent" 
                            /> */}
                        <FormSelect
                            selecttype='MidInputType'
                            type="text"
                            handleSelectChange={handleSelectChange}
                            to_be_selected={parentName}
                            data={category_data_array}
                            name="parentName"
                            data_place="category"/>
                    </div>
                    <div className="rows">
                        <CheckboxInput 
                            handleChange={handleChangeChkBtn} 
                            checked={is_active}
                            name="is_active" 
                            label="Is active"/>
                     </div> 
                    <div className="footer">
                        {page === "UPDATE-PAGE" 
                        ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
                        : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
                    </div>  
                </div> 
            </form>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    current_clicked_category: selectCurrentClickedCategory,
    category_data: selectShopCategoryData,
    category_data_array: selectShopCategoryAfterTransformToArray
})

const mapDispatchToProps = dispatch => ({
//    postCategoryToFirestoreStart: category => dispatch(postCategoryToFirestoreStart(category)),
    postDataToFirestoreStart: category => dispatch(postDataToFirestoreStart(category)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Category);



















//             CATEGORY CLASS COMPONENT                       //
// class Category extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             name: "", id: "", url: "", parentId: "", 
//             parentName:"", parent: "", is_active: false, 
//             parentUrl: "", Header: ""
//         }
//     }

//     componentDidMount(){
//         const {page, category_data_array, current_clicked_category } = this.props
//         if (page === "UPDATE-PAGE"){
//             const clickedCategory = category_data_array.find(obj => obj.id === current_clicked_category)
//             const parent_name = category_data_array.find(obj => obj.id === clickedCategory.parent)
//             this.setState({
//                 name: clickedCategory.name, id: clickedCategory.id, url: clickedCategory.url, 
//                 parent: clickedCategory.parent, is_active: clickedCategory.is_active, parentName: parent_name ? parent_name.name : null,
//                 parentUrl: clickedCategory.parentUrl, HEADER: clickedCategory.name
//             })
//         }
//     }

//     handleSubmit = async (e) => {
//         e.preventDefault()
//         const {id, name, url, parent, parentName, parentUrl, is_active} = this.state
//         // postCategoryToFirestoreStart({tableName: 'categories', objectToAdd:{ id, name, url, parent, is_active}})
//         postDataToFirestoreStart({tableName: 'categories', objectToAdd:{ id, name, url, parent, is_active}})
//         console.log("id         =" + id)
//         console.log("name       =" + name)
//         console.log("url        =" + url)
//         console.log("parent     =" + parent)
//         console.log("parentName     =" + parentName)
//         console.log("parentUrl     =" + parentUrl)
//         console.log("is_active  =" + is_active)
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
//     handleSelectChange = (e) => {
//         const {name, value} = e.target;
//         const childrens = e.target.children
//         const itemContent = Array.from(childrens).find(itm => itm.innerText === value)
//         this.setState({[name]: value, parent: itemContent.id})
//     }

//     render(){
//         const { page, category_data_array } = this.props
//         const { name, url, parentName, is_active, HEADER} = this.state
//         return(
//             <div id="add-category" className="General-Style">
//                 <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="inner-form-1">
//                         <div className="rows block-row">
//                             <span className="first">Category Name</span>
//                             <div className="second">
//                                 <FormInput type="text"
//                                     BigInputType1
//                                     handleChange={this.handleChange} 
//                                     value={name ? name : ""}
//                                     name="name" required/>
//                                 <span style={{marginTop:'5px', color:"grey"}}>Required and unique</span>
//                             </div>
//                         </div>
//                         <div className="rows">
//                             <span className="first">Category Safe Url</span>
//                             <FormInput type="text" 
//                                 inputtype='BigInputType2'
//                                 handleChange={this.handleChange} 
//                                 value={url ? url : ''}
//                                 name="url" 
//                                 required/>
//                         </div>
//                         <div className="rows grey-row">
//                             <span className="first">Parent</span>
//                             <FormSelect
//                                 selecttype='MidInputType'
//                                 type="text"
//                                 handleSelectChange={this.handleSelectChange}
//                                 to_be_selected={parentName}
//                                 data={category_data_array}
//                                 name="parentName"
//                                 data_place="category"/>
//                         </div>
//                         <div className="rows">
//                             <CheckboxInput 
//                                 handleChange={this.handleChangeChkBtn} 
//                                 checked={is_active}
//                                 name="is_active" 
//                                 label="Is active"/>
//                          </div> 
//                         <div className="footer">
//                             {page === "UPDATE-PAGE" 
//                             ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
//                             : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
//                         </div>  
//                     </div> 
//                 </form>
//             </div>
//         )
//     }
// }

// const mapStateToProps = createStructuredSelector({
//     current_clicked_category: selectCurrentClickedCategory,
//     category_data: selectShopCategoryData,
//     category_data_array: selectShopCategoryAfterTransformToArray
// })

// const mapDispatchToProps = dispatch => ({
//     //postCategoryToFirestoreStart: category => dispatch(postCategoryToFirestoreStart(category)),,
//     postDataToFirestoreStart: category => dispatch(postDataToFirestoreStart(category)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Category);




