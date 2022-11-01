import { connect } from 'react-redux';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { createStructuredSelector} from "reselect"; 
//import CollectionOverview from './collection.component';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import AddItem from '../../components/manage-collection/add-collection/add-product-type/add-product-type.component';


const mapStateToProps = createStructuredSelector ({
    //isLoading: selectIsCollectionFetching
    isLoading: state => !selectIsCollectionFetching(state)
})

const AddItemContainer = connect(mapStateToProps)(withSpinner(AddItem));
export default AddItemContainer;










//========================ITEMS CLASS COMPONENT=======================//
//========================ITEMS CLASS COMPONENT=======================//

// class Item extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {name: "", id: "", 
//         slug: "", categoryId: "",
//         brandName: "", is_visible: "", 
//         is_available: "", price: "", 
//         discount_price: "", brandId: "",
//         description: "", categoryName: "", 
//         allImages: "", imgIsMainCheckedState:[], 
//         HEADER: "", initialUrl:""}
//     }
  
//     componentDidMount(){
//       const {page } = this.props
//       if (page === "UPDATE-PAGE"){
//         this.setState({HEADER: this.StateToUse().HEADER, id: this.StateToUse().id, name: this.StateToUse().name, 
//             categoryName: this.StateToUse().categoryName, slug: this.StateToUse().slug, brandName: this.StateToUse().brandName, 
//             brandId: this.StateToUse().brandId, categoryId: this.StateToUse().categoryId, price: this.StateToUse().price, 
//             discount_price: this.StateToUse().discount_price, description: this.StateToUse().description, 
//             is_available: this.StateToUse().is_available, is_visible: this.StateToUse().is_visible, 
//             allImages: this.StateToUse().allImages, initialUrl: this.StateToUse().initialUrl,
//             imgIsMainCheckedState: this.StateToUse().allImages})
//       }
//     }
//     componentDidUpdate(){
//         const {imgIsMainCheckedState, initialUrl} = this.state
//         console.log(imgIsMainCheckedState)
//         const checked_is_main = imgIsMainCheckedState.find(obj => obj.is_main)
//         if (!checked_is_main){
//             const updatedCheckedState = imgIsMainCheckedState.map((obj) => {
//                 return obj.initial ? {...obj, url: initialUrl, is_main: true} : {...obj, is_main: false}
//             });
//             this.setState({imgIsMainCheckedState: updatedCheckedState});
//         }
//     }
//     StateToUse = () => {
//         const { product_type_data_array, collection_data, current_clicked_item } = this.props
//         let clickedItem = undefined
//         Object.keys(collection_data).map(cat_key => {
//             return collection_data[cat_key]['items'].find(itm => {
//                 if (itm.id === current_clicked_item){
//                     itm.images.map((obj, idx) => {
//                         obj['to_delete']=false
//                         obj['id'] = idx + 1
//                         obj[`imageUrlFile${idx+1}`] = ""
//                         if (obj.is_main){obj['initial'] = true}
//                         return obj
//                     })
//                     return clickedItem = itm
//                 }
//             })
//         })
//         const initialData = clickedItem.images.find(itm => itm.is_main ? itm.url : null)
//         const brand_id   = product_type_data_array.find(product_type => product_type.id === clickedItem.brandId)
//         return {name: clickedItem.name, id: clickedItem.id, slug: clickedItem.itemUrl, categoryId: clickedItem.categoryId,
//             brandName: brand_id.name, is_visible: clickedItem.is_visible, is_available: clickedItem.is_available,
//             price: clickedItem.price, discount_price: clickedItem.discount_price, brandId: clickedItem.brandId,
//             description: clickedItem.description, categoryName: clickedItem.categoryName,   
//             allImages: clickedItem.images, HEADER: clickedItem.name, initialUrl: initialData.url}
//     }
  
//     handleSubmit = async (e) => {
//         e.preventDefault()
//         const { HEADER, id, name, categoryName, slug, brandName, categoryId, price, 
//         discount_price, description, is_available, is_visible,
//         allImages, brandId, imgIsMainCheckedState } = this.state
//         console.log(imgIsMainCheckedState)

//         const {postItemToFirestoreStart, postDataToFirestoreStart} = this.props
//         // postItemToFirestoreStart({tableName: 'collections', objectToAdd:{ id, name, 
//           // categoryName, slug, brandName, categoryId, price, discount_price, 
//           // description, is_available, is_visible, brandId, imgIsMainCheckedState }})
//         postDataToFirestoreStart({tableName: 'collections', objectToAdd:{ id, name, 
//           categoryName, slug, brandName, categoryId, price, discount_price, 
//           description, is_available, is_visible, brandId, imgIsMainCheckedState }})
//         console.log("id                 =" + id)
//         console.log("name               =" + name)
//         console.log("slug               =" + slug)
//         console.log("categoryName       =" + categoryName)
//         console.log("brandId            =" + brandName)
//         console.log("categoryId         =" + categoryId)
//         console.log("brandId            =" + brandId)
//         console.log("price              =" + price)
//         console.log("discount_price     =" + discount_price)
//         console.log("description        =" + description)
//         console.log("is_available       =" + is_available)
//         console.log("is_visible         =" + is_visible)
//         console.log("allImages          =" + allImages)
//         console.log("images             =" + imgIsMainCheckedState)
//     }

    
//     handleChange = (e) => {
//         const {is_available, is_visible, imgIsMainCheckedState } = this.state
//         const {name} = e.target;
//         var value = name ===  'is_available' ? !is_available 
//         : name ===  'is_visible' ? !is_visible
//         :  e.target.value 
  
//         // this is to input same value of a user chosen img file whose 
//         // name corresponds with database image name, as it new url
//           imgIsMainCheckedState.map(obj => {
//             Object.keys(obj).find(itm => {
//                 if (itm === name){
//                     obj.url = value
//                 }
//             })
//         })
//         this.setState({[name]: value})
//     }
//     handleSelectChange = (e, task) => {
//         const {name, value} = e.target;
//         const childrens = e.target.children
//         const itemContent = Array.from(childrens).find(itm => itm.innerText === value)
//         return task==='update-brand-id' 
//         ? this.setState({[name]: value, brandId: itemContent.id})
//         : task==='update-category-id'
//         ? this.setState({[name]: value, categoryId: itemContent.id})
//         : null;
//     }       
//     HandleImageCheckBox = (position, task) => {
//       const { imgIsMainCheckedState } = this.state
//       const updatedCheckedState = imgIsMainCheckedState.map((obj, index) => {
//           return index === position && task === 'is_main' ? {...obj, is_main: !obj.is_main} 
//           : index !== position && task === 'is_main' ? {...obj, is_main: false} 
//           : index === position && task === 'to_delete' ? {...obj, to_delete: !obj.to_delete}
//           : index !== position && task === 'to_delete' ? obj : null
//       }); 
//       this.setState({imgIsMainCheckedState: updatedCheckedState});
//     }
  
//     render(){
//         const { page, product_type_data_array, category_data_array } = this.props
//         const { HEADER, name, categoryName, slug, brandName, price, 
//                 discount_price, description, is_available, is_visible, 
//                 imgIsMainCheckedState } = this.state
//         return(
//             <div id="add-item" className="General-Style">
//                 <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="inner-form-1">
//                         <div className="rows">
//                             <span className="first">Product type</span>
//                             <FormSelect
//                                 selecttype='MidInputType'
//                                 type="text"
//                                 handleSelectChange={(e) => this.handleSelectChange(e,'update-brand-id')}
//                                 to_be_selected={brandName}
//                                 data={product_type_data_array}
//                                 name="brandName"
//                                 data_place="product type"/>
//                         </div>
//                         <div className="rows">
//                             <span className="first">Category</span>
//                             <FormSelect
//                                 selecttype='MidInputType'
//                                 type="text"
//                                 handleSelectChange={(e) => this.handleSelectChange(e,'update-category-id')}
//                                 to_be_selected={categoryName}
//                                 data={category_data_array}
//                                 name="categoryName"
//                                 data_place="category"/>
//                         </div>
//                         <div className="rows block-row">
//                             <span className="first">Title</span>
//                             <div className="second">
//                                 <FormInput  
//                                     inputtype='BigInputType1'
//                                     type="text"
//                                     handleChange={(e) => this.handleChange(e)}
//                                     value={ name ? name : ""}  
//                                     name="name" 
//                                     required/>
//                                 <span style={{marginTop:'5px', color:"grey"}}>Required</span>
//                             </div>
//                         </div>
//                         <div className="rows">
//                             <span className="first">Slug</span>
//                             <FormInput  
//                                 inputtype='BigInputType2'
//                                 type="text"
//                                 handleChange={(e) => this.handleChange(e)}
//                                 value={slug ? slug : ""} 
//                                 name="slug" 
//                                 required/>
//                         </div>
//                         <div className="rows">
//                             <span className="first">Description</span>
//                             <textarea 
//                                 defaultValue={description ? description : ""}
//                                 name="description" 
//                                 handleChange={(e) => this.handleChange(e)}
//                                 required/>
//                         </div>
//                         <div className="rows">
//                             <span className="first">Regular Price</span>
//                             <FormInput
//                                 inputtype='SmallInputType'
//                                 defaultValue={price ? price : ""}  
//                                 type="number"
//                                 handleChange={(e) => this.handleChange(e)}
//                                 name="price" 
//                                 required />
//                         </div>
//                         <div className="rows">
//                             <span className="first">Discount Price</span>
//                             <FormInput 
//                                 inputtype='SmallInputType'
//                                 defaultValue={
//                                 discount_price 
//                                 ? discount_price 
//                                 : null
//                                 } type="number" 
//                                 handleChange={(e) => this.handleChange(e)}
//                                 name="discount_price" 
//                                 />
//                         </div>
//                         <div className="rows">
//                             <CheckboxInput 
//                                 checked={is_available}
//                                 handleChange={(e) => this.handleChange(e)}
//                                 name="is_available" 
//                                 label="Product Availabilty"/>
//                         </div>
//                         <div className="rows">
//                             <CheckboxInput 
//                                 checked={is_visible}
//                                 handleChange={(e) => this.handleChange(e)}
//                                 name="is_visible" 
//                                 label="Product Visibilty"/>
//                         </div>
//                     </div>
  
//                     <div className="inner-form-2">
//                         <div className="top-1">
//                             <h1>Product Images</h1>
//                             <div className="sub-head"><span style={{width: '40%'}}>IMAGES</span><span>IS MAIN</span><span>DELETE</span></div>
//                         </div>
//                       <div className="row-list">
//                           {imgIsMainCheckedState.map(({url, is_main, to_delete}, idx) => (
//                               <div key={idx} className="rows">
//                                   <div className="first">
//                                       <span className="top-2">{url ? `${url.length > 20 
//                                       ? url.slice(0,25) + '......' : url}` : null }</span>
//                                       <div className="bottom">
//                                           <input 
//                                               className='parallelWidth' 
//                                               role='button' 
//                                               type='file'
//                                               name={`imageUrlFile${idx+1}`}
//                                               onChange={(e) => this.handleChange(e,idx+1)}
//                                           />
//                                       </div>
//                                   </div>
//                                   <CheckboxInput 
//                                       checked={is_main}
//                                       handleChange={(e) => this.HandleImageCheckBox(idx,'is_main')}
//                                       name={`imageUrlIsMain${idx+1}`}/>
//                                   <CheckboxInput 
//                                       checked={to_delete}
//                                       handleChange={(e) => this.HandleImageCheckBox(idx,'to_delete')}
//                                       name={`imageUrlDelete${idx+1}`}/>
//                               </div>
//                           ))}
//                       </div>
//                     </div>
//                     <div className="footer">
//                         {page === "UPDATE-PAGE" 
//                         ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
//                         : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
//                     </div>
//                     {/* <div className="product-spec">
//                         <div>
//                             <h1>Product Specification Values</h1>
//                             <div><span>SPECIFICATION</span><span>VALUE</span><span>DELETE</span></div>
//                         </div>
//                         <div>
//                             <div>
//                                 <div><span>red</span><input /></div><input /><input type="checkbox" />
//                             </div>
//                             <div>
//                                 <div><span>red</span><input /></div><input /><input type="checkbox" />
//                             </div>
//                             <div>
//                                 <div><span>red</span><input /></div><input /><input type="checkbox" />
//                             </div>
//                         </div>
//                     </div> */}
                
//                 </form>
//             </div>
//         )
//     }
// }
  
// const mapStateToProps = createStructuredSelector({
//     collection_data: selectShopCollectionsData,
//     product_type_data_array: selectShopProductTypeAfterTransformToArray,
//     category_data_array: selectShopCategoryAfterTransformToArray,
//     current_clicked_item: selectCurrentClickedItem,
// })
// const mapDispatchToProps = dispatch => ({
//     // postItemToFirestoreStart: item => dispatch(postItemToFirestoreStart(item)),
//     postDataToFirestoreStart: item => dispatch(postDataToFirestoreStart(item)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Item);






























