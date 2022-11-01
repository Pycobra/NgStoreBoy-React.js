import React, { useState, useEffect } from "react";
import "./account.styles.css";
import "../form-styling.styles.css"
import { connect } from "react-redux";
import { selectCurrentClickedUser } from "../../../redux/admin/admin.selector";
//import { selectClickedUser  } from "../../../redux/shop/shop.selectors";
import { // postAccountToFirestoreStart,
    postDataToFirestoreStart } from "../../../redux/admin/admin.action";
import { selectUserData, } from "../../../redux/user/user.selector";
import { createStructuredSelector} from "reselect"; 
import CustomButton from "../../custom-button/custom-button.component";
import FormInput from "../../form-input/form-input.component";
import CheckboxInput from "../../checkbox-input/checkbox-input.component";



//             ACCOUNT FUNCTIONAL COMPONENT                       //

const Account = ({postDataToFirestoreStart, clicked_user_id, usersData, page}) => {
    const [userAccount, setUserAccount] = useState({
        id:"", password:"", email:"", username:"", 
        unique_id:"", firstname:"", surname:"", 
        mobile:"", is_staff:"", is_active:"", HEADER:"",
    })
    
    const [checkedState, setCheckedState] = useState(
        new Array(2).fill(false)
    );
    const {id, password, email, username, unique_id, firstname, surname, mobile, is_staff, is_active, HEADER} = userAccount
    useEffect(() => {
        const clickedUser = usersData.find(user => user.id === clicked_user_id)
        if (page === "UPDATE-PAGE"){
            setUserAccount({id: clickedUser.id, password: clickedUser.password, 
                email: clickedUser.email, username: clickedUser.username, 
                unique_id: clickedUser.unique_id, firstname: clickedUser.firstname,
                surname: clickedUser.surname, mobile: clickedUser.mobile, 
                is_staff: clickedUser.is_staff, is_active: clickedUser.is_active,
                HEADER: clickedUser.username,
            })
        }
    }, [page, usersData, clicked_user_id]
    )
    const handleSubmit = async (e) => {
        e.preventDefault()
        // postAccountToFirestoreStart({tableName: 'accounts', objectToAdd:{id, password, email, username, unique_id,
        //             firstname, surname, mobile, is_staff, is_active}})
        postDataToFirestoreStart({tableName: 'users', objectToAdd:{id, password, email, username, unique_id,
            firstname, surname, mobile, is_staff, is_active}})
        console.log("id         =" + id)
        console.log("password   =" + password)
        console.log("email      =" + email)
        console.log("username   =" + username)
        console.log("unique_id  =" + unique_id)
        console.log("firstname  =" + firstname)
        console.log("surname    =" + surname)
        console.log("mobile     =" +  mobile)
        console.log("is_staff   =" + is_staff)
        console.log("is_active  =" + is_active)
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserAccount({...userAccount, [name]: value})
    }
    const handleChangeChkBtn = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }
    return(
        <div id="add-account" className="General-Style">
            <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
            <form onSubmit={handleSubmit}>
                <div className="inner-form-1">
                    <div className="rows">
                        <span className="first">Password</span>
                            <FormInput 
                                inputtype='BigInputType2'
                                handleChange={handleChange} 
                                value={password} 
                                type="password" name="password" 
                                required/>
                    </div>
                    <div className="rows block-row">
                        <span className="first">Last login</span>
                        <div className="second">
                            <FormInput 
                                style={{width: '40%', marginBottom: "5px"}} 
                                handleChange={handleChange} 
                                type="date" name="date-1" />
                            <FormInput 
                                style={{width: '35%'}} 
                                handleChange={handleChange} 
                                type="date" name="date-2" />
                        </div>
                    </div>
                    <div className="rows">
                        <span className="first">Email address</span>
                        <FormInput 
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={email} 
                            type="email" name="email" 
                            required/>
                    </div>
                    <div className="rows">
                        <span className="first">User name</span>
                        <FormInput 
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={username} 
                            type="text" name="username" 
                            required/>
                    </div>
                    <div className="rows">
                        <span className="first">Unique id</span>
                        <FormInput
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={unique_id} 
                            type="text" name="unique_id" 
                            required/>
                    </div>
                    <div className="rows">
                        <span className="first">Firstname</span>
                        <FormInput
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={firstname} 
                            type="text" name="firstname" 
                            required/>
                    </div>
                    <div className="rows">
                        <span className="first">Surname</span>
                        <FormInput
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={surname} 
                            type="text" name="surname" 
                            required/>
                    </div>
                    {/* // <div className="rows">
                    //     <span className="first">Profile image</span>
                    //     <input  type="number" className="small-input" />
                    // </div>  */}
                    <div className="rows">
                        <span className="first">Mobile</span>
                        <FormInput
                            inputtype='BigInputType2'
                            handleChange={handleChange} 
                            value={mobile} 
                            type="text" name="mobile" 
                            required/>
                    </div>
                    <div className="rows">
                        <CheckboxInput 
                            type="checkbox"
                            name="is_active" 
                            checked={checkedState[1]}
                            handleChange={() => handleChangeChkBtn(1)}
                            label="Is active"/>
                    </div>
                    <div className="rows">
                        <CheckboxInput 
                            checked={checkedState[2]}
                            handleChange={() => handleChangeChkBtn(2)}
                            type="checkbox"
                            name="is_staff" 
                            label="Is staff"/>
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

const mapStateToProps = createStructuredSelector({
    clicked_user_id: selectCurrentClickedUser,
    usersData: selectUserData
})
const mapDispatchToProps = dispatch => ({
    // postAccountToFirestoreStart: account => dispatch(postAccountToFirestoreStart(account)),
    postDataToFirestoreStart: account => dispatch(postDataToFirestoreStart(account)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Account);
























//             ACCOUNT CLASS COMPONENT                       //
// class Account extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             id:"", 
//             password:"",   
//             email:"", 
//             username:"", 
//             unique_id:"", 
//             firstname:"",
//             surname:"", 
//             mobile:"", 
//             is_staff:false, 
//             is_active:false,
//             checkedState: new Array(2).fill(false)
//         }
//     }
//     componentDidMount(){
//         const { clicked_user_id, usersData, page } = this.props
//         const clickedUser = usersData.find(user => user.id === clicked_user_id)
//         if (page === "UPDATE-PAGE"){
//            this.setState({id: clickedUser.id, password: clickedUser.password, 
//                email: clickedUser.email, username: clickedUser.username, 
//                unique_id: clickedUser.unique_id, firstname: clickedUser.firstname,
//                surname: clickedUser.surname, mobile: clickedUser.mobile, 
//                is_staff: clickedUser.is_staff, is_active: clickedUser.is_active}, () => {})
//         }
//     }   


//     handleSubmit = async (e) => {
//         e.preventDefault()
//         const {postDataToFirestoreStart} = this.props
//         postAccountToFirestoreStart({tableName: 'users', objectToAdd:{id, password, email, username, unique_id,
//              firstname, surname, mobile, is_staff, is_active}})
//         // postDataToFirestoreStart({tableName: 'accounts', objectToAdd:{id, password, email, username, unique_id,
//         //     firstname, surname, mobile, is_staff, is_active}})

//     }
//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value})
//     }
//     handleChangeChkBtn = (e, position) => {
//         console.log(position)
//         const {is_active, is_staff, checkedState} = this.state
//         // const updatedCheckedState = checkedState.map((item, index) =>
//         // index === position ? !item : item);
//         // this.setState({[checkedState[position]]: updatedCheckedState});

//         const {name} = e.target
//         const value = name === "is_active" ? is_active : is_staff
//         this.setState({[name]: !value});
//     }
//     render(){
//         const { page } = this.props
//         const {id, checkedState, password, email, username, unique_id, firstname, surname, mobile, is_staff, is_active} = this.state
//             return(
//                 <div id="add-account" className="General-Style">
//                     <h1 style={{marginBottom:'10px'}}>{username}</h1>
//                     <form onSubmit={this.handleSubmit}>
//                         <div className="inner-form-1">
//                             <div className="rows">
//                                 <span className="first">Password</span>
//                                     <FormInput 
//                                         BigInputType2
//                                         handleChange={this.handleChange} 
//                                         value={password} 
//                                         type="password" name="password" 
//                                         required/>
//                             </div>
//                             <div className="rows block-row">
//                                 <span className="first">Last login</span>
//                                 <div className="second">
//                                     <FormInput 
//                                         style={{width: '40%', marginBottom: "5px"}} 
//                                         handleChange={this.handleChange} 
//                                         type="date" name="date-1" />
//                                     <FormInput 
//                                         style={{width: '35%'}} 
//                                         handleChange={this.handleChange} 
//                                         type="date" name="date-2" />
//                                 </div>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Email address</span>
//                                 <FormInput 
//                                     BigInputType2
//                                     handleChange={this.handleChange} 
//                                     value={email} 
//                                     type="email" name="email" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">User name</span>
//                                 <FormInput 
//                                     BigInputType2
//                                     handleChange={this.handleChange} 
//                                     value={username} 
//                                     type="text" name="username" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Unique id</span>
//                                 <FormInput 
//                                     BigInputType2
//                                     handleChange={this.handleChange} 
//                                     value={unique_id} 
//                                     type="text" name="unique_id" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Firstname</span>
//                                 <FormInput 
//                                     BigInputType2
//                                     handleChange={this.handleChange} 
//                                     value={firstname} 
//                                     type="text" name="firstname" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Surname</span>
//                                 <FormInput 
//                                     BigInputType2
//                                     handleChange={this.handleChange} 
//                                     value={surname} 
//                                     type="text" name="surname" 
//                                     required/>
//                             </div>
//                             {/* // <div className="rows">
//                             //     <span className="first">Profile image</span>
//                             //     <input  type="number" className="small-input" />
//                             // </div>  */}
//                             <div className="rows">
//                                 <span className="first">Mobile</span>
//                                 <FormInput 
//                                     BigInputType2
//                                     handleChange={this.handleChange} 
//                                     value={mobile} 
//                                     type="text" name="mobile" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <CheckboxInput 
//                                     type="checkbox"
//                                     name="is_active" 
//                                     checked={is_active}
//                                     handleChange={(e) => this.handleChangeChkBtn(e)}
//                                     label="Is active"/>
//                             </div>
//                             <div className="rows">
//                                 <CheckboxInput 
//                                     checked={is_staff}
//                                     handleChange={(e) => this.handleChangeChkBtn(e)}
//                                     type="checkbox"
//                                     name="is_staff" 
//                                     label="Is staff"/>
//                             </div>
//                         </div>
//                         <div className="footer">
//                             {page === "UPDATE-PAGE" 
//                             ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
//                             : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
//                         </div>
                    
//                     </form>
//                 </div>
//             )
//     }
// }
// const mapStateToProps = createStructuredSelector({
//     clicked_user_id: selectCurrentClickedUser,
//     usersData: selectUserData
// })
// export default connect(mapStateToProps)(Account);







// //            ITEMS CLASS COMPONENT                       //
// class Item extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             HEADER: "", id: "", name: "", 
//             categoryName: "", url: "", 
//             brandId: "", categoryId: "", 
//             price: "", discount_price: "", 
//             description: "", is_available: "", 
//             is_visible: "", imageUrl1: "", 
//             imageUrl2: "", imageUrl3: "", 
//             imageUrl4: "", imageUrl5: "",
//             imageUrlFile1: "", imageUrlFile2: "", 
//             imageUrlFile3: "", imageUrlFile4: "", 
//             imageUrlFile5: ""
//         }
//     }

//     componentDidMount(){
//         const { product_type_data_array, collection_data, current_clicked_item, page } = this.props
//         if (page === "UPDATE-PAGE"){
//             let clickedItem = undefined
//             Object.keys(collection_data).map(cat_key => {
//                 collection_data[cat_key]['items'].find(itm => {
//                     if (itm.id === current_clicked_item){
//                         return clickedItem = itm
//                     }
//                 })
//             })
//             this.setState({name: clickedItem.name, id: clickedItem.id, url: clickedItem.itemUrl,
//                 brandId: product_type_data_array.find(product_type => product_type.id === clickedItem.brandId),
//                 is_visible: clickedItem.is_visible, is_available: clickedItem.is_available,
//                 price: clickedItem.price, discount_price: clickedItem.discount_price,
//                 description: clickedItem.description, imageUrl1: clickedItem.imageUrl1.find(itm => itm),
//                 imageUrl2: clickedItem.imageUrl2.find(itm => itm), imageUrl3: clickedItem.imageUrl3.find(itm => itm),
//                 imageUrl4: clickedItem.imageUrl4.find(itm => itm), imageUrl5: clickedItem.imageUrl5.find(itm => itm),
//                 categoryName: clickedItem.categoryName, HEADER: clickedItem.name
//             })
//         }
//     }

//     handleSubmit = async (e) => {
//         e.preventDefault()            
//         const { postUserAccount } = this.props;
//         const { HEADER, id, name, categoryName, url, brandId, categoryId, price, 
//                 discount_price, description, is_available, is_visible, imageUrl1, imageUrl2, 
//                 imageUrl3, imageUrl4, imageUrl5, imageUrlFile1, imageUrlFile2,
//                 imageUrlFile3, imageUrlFile4, imageUrlFile5 } = this.state
//         postUserAccount({ HEADER, id, name, categoryName, url, brandId, categoryId, price, 
//             discount_price, description, is_available, is_visible, imageUrl1, imageUrl2, 
//                 imageUrl3, imageUrl4, imageUrl5, imageUrlFile1, imageUrlFile2,
//                 imageUrlFile3, imageUrlFile4, imageUrlFile5 })
//     }
//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value})
//     }
    
//     handleSubmit = async (e) => {
//         const { HEADER, id, name, categoryName, url, brandId, categoryId, price, 
//             discount_price, description, is_available, is_visible, imageUrl1, imageUrl2, 
//             imageUrl3, imageUrl4, imageUrl5, imageUrlFile1, imageUrlFile2,
//             imageUrlFile3, imageUrlFile4, imageUrlFile5 } = this.state
//         e.preventDefault()
//         console.log("id             =" + id)
//         console.log("name           =" + name)
//         console.log("url            =" + url)
//         console.log("categoryName   =" + categoryName)
//         console.log("brandId        =" + brandId)
//         console.log("categoryId     =" + categoryId)
//         console.log("price          =" + price)
//         console.log("discount_price =" + discount_price)
//         console.log("description    =" + description)
//         console.log("is_available   =" + is_available)
//         console.log("is_visible     =" + is_visible)
//         console.log("imageUrl1      =" + imageUrl1)
//         console.log("imageUrl2      =" + imageUrl2)
//         console.log("imageUrl3      =" + imageUrl3)
//         console.log("imageUrl4      =" + imageUrl4)
//         console.log("imageUrl5      =" + imageUrl5)
//         console.log("imageUrlFile1  =" + imageUrlFile1)
//         console.log("imageUrlFile2  =" + imageUrlFile2)
//         console.log("imageUrlFile3  =" + imageUrlFile3)
//         console.log("imageUrlFile4  =" + imageUrlFile4)
//         console.log("imageUrlFile5  =" + imageUrlFile5)
//     }
//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value})
//     }
//     handleChangeChkBtn = (e) => {
//         const { is_available, is_visible, imageUrl1, imageUrl2, 
//             imageUrl3, imageUrl4, imageUrl5 } = this.state
//         const {name} = e.target;
//         var value = name ===  'is_available' ? !is_available 
//         : name ===  'is_visible' ? !is_visible 
//         : name ===  'imageUrl1' ? {url: imageUrl1.url, is_main: !imageUrl1.is_main}
//         : name ===  'imageUrl2' ? {url: imageUrl2.url, is_main: !imageUrl2.is_main} 
//         : name ===  'imageUrl3' ? {url: imageUrl3.url, is_main: !imageUrl3.is_main}
//         : name ===  'imageUrl4' ? {url: imageUrl4.url, is_main: !imageUrl4.is_main} 
//         : name ===  'imageUrl5' ? {url: imageUrl5.url, is_main: !imageUrl5.is_main} 
//         : name ===  'imageUrlFile1' ? e.target.value
//         : name ===  'imageUrlFile2' ? e.target.value
//         : name ===  'imageUrlFile3' ? e.target.value
//         : name ===  'imageUrlFile4' ? e.target.value
//         : name ===  'imageUrlFile5' ? e.target.value
//         : false
//         this.setState({[name]: value})
//     }

//     render(){
//         const { page} = this.props
//         const { HEADER, id, name, categoryName, url, brandId, categoryId, price, 
//             discount_price, description, is_available, is_visible, imageUrl1, imageUrl2, 
//             imageUrl3, imageUrl4, imageUrl5, imageUrlFile1, imageUrlFile2,
//             imageUrlFile3, imageUrlFile4, imageUrlFile5 } = this.state
//             return(
//                 <div id="add-item" className="General-Style">
//                     <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="inner-form-1">
//                             <div className="rows">
//                                 <span className="first">Product type</span>
//                                 <FormInput 
//                                     MidInputType
//                                     value={brandId.name ? brandId.name : ""}
//                                     type="text"
//                                     handleChange={handleChange}
//                                     name="brandId"
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Category</span>
//                                 <FormInput 
//                                     MidInputType
//                                     value={categoryName ? categoryName : ""} 
//                                     type="text"
//                                     handleChange={handleChange}
//                                     //className="mid-input" 
//                                     name="categoryName" 
//                                     required/>
//                             </div>
//                             <div className="rows block-row">
//                                 <span className="first">Title</span>
//                                 <div className="second">
//                                     <FormInput  
//                                         BigInputType1
//                                         type="text"
//                                         handleChange={handleChange}
//                                         value={ name ? name : ""}  
//                                         name="productName" 
//                                         required/>
//                                     <span style={{marginTop:'5px', color:"grey"}}>Required</span>
//                                 </div>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Slug</span>
//                                 <FormInput  
//                                     BigInputType2
//                                     type="text"
//                                     handleChange={handleChange}
//                                     value={url ? url : ""} 
//                                     name="url" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Description</span>
//                                 <textarea 
//                                     defaultValue={description ? description : ""}  
//                                     // handlechange={handleChange}
//                                     name="description" 
//                                     required/>
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Regular Price</span>
//                                 <FormInput
//                                     SmallInputType
//                                     defaultValue={price ? price : ""}  
//                                     type="number"
//                                     handleChange={handleChange}
//                                     //className="small-input"  
//                                     name="price" 
//                                     required />
//                             </div>
//                             <div className="rows">
//                                 <span className="first">Discount Price</span>
//                                 <FormInput 
//                                     SmallInputType
//                                     defaultValue={
//                                     discount_price 
//                                     ? discount_price 
//                                     : null
//                                     } type="number" 
//                                     handleChange={handleChange} 
//                                     name="discount_price" 
//                                     />
//                             </div>
//                             {/* <div className="rows"><span className="first">Discount Percent</span><input className="small-input" /></div> */}
//                             {/* <div className="rows"><span className="first">Price difference</span><input className="small-input" /></div> */}
                            
//                             <div className="rows">
//                                 <CheckboxInput 
//                                     checked={is_available}
//                                     handleChange={(e) => handleChangeChkBtn(e,1)}
//                                     type="checkbox"
//                                     name="is_available" 
//                                     label="Product Availabilty"/>
//                              </div>
//                             <div className="rows">
//                                 <CheckboxInput 
//                                     checked={is_visible}
//                                     handleChange={(e) => handleChangeChkBtn(e,2)}
//                                     type="checkbox"
//                                     name="is_visible" 
//                                     label="Product Visibilty"/>
//                             </div>
//                             {/* <div className="rows"><span className="first">User Wishlist</span><input className="list-input" /></div>
//                             <div className="rows"><span className="first">Likes</span><input className="list-input" /></div> */}
//                         </div>
//                         <div className="inner-form-2">
//                             <div className="top-1">
//                                 <h1>Product Images</h1>
//                                 <div className="sub-head"><span style={{width: '40%'}}>IMAGES</span><span>IS MAIN</span><span>DELETE</span></div>
//                             </div>
//                             <div className="row-list">
//                                 <div className="rows">
//                                     <div className="first">
//                                         <span className="top">{imageUrl1.url ? `${imageUrl1.url.length > 20 
//                                         ? imageUrl1.url.slice(0,25) + '......' : imageUrl1.url}` : null }</span>
//                                         <div className="bottom">
//                                             <input 
//                                                 className='parallelWidth' 
//                                                 role='button' 
//                                                 type='file'
//                                                 name="imageUrlFile1"
//                                                 onChange={(e) => handleChangeChkBtn(e,3)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <CheckboxInput 
//                                         checked={imageUrl1.is_main ? imageUrl1.is_main : false}
//                                         handleChange={(e) => handleChangeChkBtn(e,4)}
//                                         type="checkbox"
//                                         name="imageUrl1"/>
//                                     <CheckboxInput 
//                                         checked={false}
//                                         handleChange={(e) => handleChangeChkBtn(e,5)}
//                                         type="checkbox"
//                                         name="deleteImage1"/>
//                                 </div>
//                                 <div className="rows">
//                                     <div className="first">
//                                         <span className="top">{imageUrl2.url ? `${imageUrl2.url.length > 20 
//                                         ? imageUrl2.url.slice(0,25) + '......' : imageUrl2.url}` : null }</span>
//                                         <div className="bottom">
//                                             <input 
//                                                 className='parallelWidth' 
//                                                 role='button' 
//                                                 type='file'
//                                                 name="imageUrlFile2"
//                                                 onChange={(e) => handleChangeChkBtn(e,6)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <CheckboxInput 
//                                         checked={imageUrl2.is_main ? imageUrl2.is_main : false}
//                                         handleChange={(e) => handleChangeChkBtn(e,7)}
//                                         type="checkbox"
//                                         name="imageUrl2"/>
//                                     <CheckboxInput 
//                                         checked={false}
//                                         handleChange={(e) => handleChangeChkBtn(e,8)}
//                                         type="checkbox"
//                                         name="deleteImage2"/>
//                                 </div>
//                                 <div className="rows">
//                                     <div className="first">
//                                         <span className="top">{imageUrl3.url ? `${imageUrl3.url.length > 20 
//                                         ? imageUrl3.url.slice(0,25) + '......' : imageUrl3.url}` : null }</span>
//                                         <div className="bottom">
//                                             <input 
//                                                 className='parallelWidth' 
//                                                 role='button' 
//                                                 type='file'
//                                                 name="imageUrlFile3"
//                                                 onChange={(e) => handleChangeChkBtn(e,9)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <CheckboxInput 
//                                         checked={imageUrl3.is_main ? imageUrl3.is_main : false}
//                                         handleChange={(e) => handleChangeChkBtn(e,10)}
//                                         type="checkbox"
//                                         name="imageUrl3"/>
//                                     <CheckboxInput 
//                                         checked={false}
//                                         handleChange={(e) => handleChangeChkBtn(e,11)}
//                                         type="checkbox"
//                                         name="deleteImage3"/>
//                                 </div>
//                                 <div className="rows">
//                                     <div className="first">
//                                         <span className="top">{imageUrl4.url ? `${imageUrl4.url.length > 20 
//                                         ? imageUrl4.url.slice(0,25) + '......' : imageUrl4.url}` : null }</span>
//                                         <div className="bottom">
//                                             <input 
//                                                 className='parallelWidth' 
//                                                 role='button' 
//                                                 type='file'
//                                                 name="imageUrlFile4"
//                                                 onChange={(e) => handleChangeChkBtn(e,12)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <CheckboxInput 
//                                         checked={imageUrl4.is_main ? imageUrl4.is_main : false}
//                                         handleChange={(e) => handleChangeChkBtn(e,13)}
//                                         type="checkbox"
//                                         name="imageUrl4"/>
//                                     <CheckboxInput 
//                                         checked={false}
//                                         handleChange={(e) => handleChangeChkBtn(e,14)}
//                                         type="checkbox"
//                                         name="deleteImage4"/>
//                                 </div>
//                                 <div className="rows">
//                                     <div className="first">
//                                         <span className="top">{imageUrl5.url ? `${imageUrl5.url.length > 20 
//                                         ? imageUrl5.url.slice(0,25) + '......' : imageUrl5.url}` : null }</span>
//                                         <div className="bottom">
//                                             <input 
//                                                 className='parallelWidth' 
//                                                 role='button' 
//                                                 type='file'
//                                                 name="imageUrlFile5"
//                                                 onChange={(e) => handleChangeChkBtn(e,15)}
//                                                 // handleChange={(e) => console.log(e)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <CheckboxInput 
//                                         checked={imageUrl5.is_main ? imageUrl5.is_main : false}
//                                         handleChange={(e) => handleChangeChkBtn(e,16)}
//                                         type="checkbox"
//                                         name="imageUrl5"/>
//                                     <CheckboxInput 
//                                         checked={false}
//                                         handleChange={(e) => handleChangeChkBtn(e,17)}
//                                         type="checkbox"
//                                         name="deleteImage5"/>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="footer">
//                             {page === "UPDATE-PAGE" 
//                             ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
//                             : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
//                         </div>
//                         {/* <div className="product-spec">
//                             <div>
//                                 <h1>Product Specification Values</h1>
//                                 <div><span>SPECIFICATION</span><span>VALUE</span><span>DELETE</span></div>
//                             </div>
//                             <div>
//                                 <div>
//                                     <div><span>red</span><input /></div><input /><input type="checkbox" />
//                                 </div>
//                                 <div>
//                                     <div><span>red</span><input /></div><input /><input type="checkbox" />
//                                 </div>
//                                 <div>
//                                     <div><span>red</span><input /></div><input /><input type="checkbox" />
//                                 </div>
//                             </div>
//                         </div> */}
                    
//                     </form>
//                 </div>
//             )
//     }
// }
// const mapStateToProps = createStructuredSelector({
//     collection_data: selectShopCollectionsData,
//     product_type_data_array: selectShopProductTypeAfterTransformToArray,
//     current_clicked_item: selectCurrentClickedItem,
// })
// const mapDispatchToProps = dispatch => ({
//     // postAccountToFirestoreStart: account => dispatch(postDataToFirestoreStart(account)),
//     postDataToFirestoreStart: account => dispatch(postDataToFirestoreStart(account)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Item);

