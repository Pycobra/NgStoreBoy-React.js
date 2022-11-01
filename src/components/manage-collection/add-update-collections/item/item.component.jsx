import React, { useState, useEffect } from "react";
import "./item.styles.css";
import "../../form-styling.styles.css"
import { connect } from "react-redux";
import { selectCurrentClickedItem } from "../../../../redux/admin/admin.selector";
import { // postItemToFirestoreStart, 
    postDataToFirestoreStart } from "../../../../redux/admin/admin.action";
import { selectShopProductTypeAfterTransformToArray, 
    selectShopCollectionsData,
    selectShopCategoryAfterTransformToArray} from "../../../../redux/shop/shop.selectors";
import { createStructuredSelector} from "reselect"; 
import CustomButton from "../../../custom-button/custom-button.component";
import FormInput from "../../../form-input/form-input.component";
import FormSelect from "../../../form-select/form-select.component";
import CheckboxInput from "../../../checkbox-input/checkbox-input.component";
import { handleCheckButton } from "../../../../redux/shop/shop.utils";



  



//========================ITEMS FUNCTIONAL COMPONENT=======================//
//========================ITEMS FUNCTIONAL COMPONENT=======================//

const Item = ({postDataToFirestoreStart, product_type_data_array, collection_data, 
  current_clicked_item, category_data_array, page }) => {

  const stateToUse = () => {
      let clickedItem = undefined
      Object.keys(collection_data).map(cat_key => {
          return collection_data[cat_key]['items'].find(itm => {
              if (itm.id === current_clicked_item){
                  itm.images.map((obj, idx) => {
                      obj['to_delete']=false
                      obj['id'] = idx
                      obj[`imageUrlFile${idx}`] = ""
                      if (obj.is_main){obj['initial'] = true}
                      return obj
                  })
                  return clickedItem = itm
              }
          })
      })
      if (page === "UPDATE-PAGE"){
        const data = clickedItem.images.find(itm => itm.is_main ? itm.url : null)
        const brand_id   = product_type_data_array.find(product_type => product_type.id === clickedItem.brandId)
        return {name: clickedItem.name, id: clickedItem.id, itemUrl: clickedItem.itemUrl, categoryId: clickedItem.categoryId,
            brandName: brand_id.name, is_visible: clickedItem.is_visible, is_available: clickedItem.is_available,
            price: clickedItem.price, discount_price: clickedItem.discount_price, brandId: clickedItem.brandId,
            description: clickedItem.description, categoryName: clickedItem.categoryName,   
            allImages: clickedItem.images, HEADER: clickedItem.name, initialImgData: {id: data.id, url: data.url},
            initialData: data}
      }
    return {}
  }   
  var [items, setitems] = useState({
      HEADER: stateToUse().HEADER, id: stateToUse().id, name: stateToUse().name, categoryName: stateToUse().categoryName,
      itemUrl: stateToUse().itemUrl, brandName: stateToUse().brandName, brandId: stateToUse().brandId, 
      categoryId: stateToUse().categoryId, price: parseInt(stateToUse().price), discount_price: parseInt(stateToUse().discount_price), 
      description: stateToUse().description, is_available: stateToUse().is_available, is_visible: stateToUse().is_visible, 
      allImages: stateToUse().allImages, initialImgData: stateToUse().initialImgData, initialData: stateToUse().initialData,
      newImg: [{url: null, is_main: false, to_delete: false},{url: null, is_main: false, to_delete: false},
        {url: null, is_main: false, to_delete: false},{url: null, is_main: false, to_delete: false},
        {url: null, is_main: false, to_delete: false}]
  })
  const { HEADER, id, name, categoryName, itemUrl, brandName, categoryId, price, 
      discount_price, description, is_available, is_visible, allImages, 
      brandId, newImg, initialImgData } = items 
  const [imgIsMainCheckedState, setImgIsMainCheckedState] = useState(
      {updateImg:allImages, addImg:newImg}
  );
  const {updateImg, addImg} = imgIsMainCheckedState

  //purpose of useEffect here is to ensure the original url 'is_main' is auto checked
  //if a user unchecks all checked checkbox
  useEffect(() => {
    console.log(addImg, 33333)
    if (updateImg){
      const checked_is_main = updateImg.find(obj => obj.is_main)
      if (!checked_is_main){
          const updatedCheckedState = updateImg.map((obj) => {
              return obj.initial ? {...obj, url: initialImgData.url, is_main: true} : {...obj, is_main: false}
          });
          updateImg(updatedCheckedState);
      }
    }
  })
  const handleSubmit = async (e) => {
      e.preventDefault()
      var images = updateImg
      var type = "UPDATE"
      if (!updateImg)images = addImg
      if (page !== "UPDATE-PAGE")type = "POST"

      postDataToFirestoreStart({tableName: 'collections', action:type, objectToAdd:{ id, categoryId, 
        name, itemUrl, price, discount_price, description, is_available, is_visible, 
        brandId, images: images}})
          console.log(addImg, 11111111)
          console.log(updateImg, 2222222)
          console.log("id                 =" + id)
          console.log("name               =" + name)
          console.log("itemUrl               =" + itemUrl)
          console.log("categoryName       =" + categoryName)
          console.log("brandId            =" + brandName)
          console.log("categoryId         =" + categoryId)
          console.log("brandId            =" + brandId)
          console.log("price              =" + price)
          console.log("discount_price     =" + discount_price)
          console.log("description        =" + description)
          console.log("is_available       =" + is_available)
          console.log("is_visible         =" + is_visible)
          console.log("allImages          =" + allImages)
          console.log("images             =" + images)
      
  }
  const handleChange = (e, position) => {
      const {name} = e.target;
      var value = name ===  'is_available' ? !is_available 
      : name ===  'is_visible' ? !is_visible
      : e.target.value 

      // this is to input as value of a url, any path value 
      // a user select from the select tag
      if (name !== 'is_available' && name !== 'is_visible'){
        if (updateImg){
            const imageFiles = updateImg.map((obj, index) => 
            index === position ? {...obj, url: value} : obj
            )
            setImgIsMainCheckedState({...imgIsMainCheckedState, updateImg:imageFiles});
        } else {
            const imageFiles = addImg.map((obj, index) => 
            index === position ? {...obj, url: value} : obj
            )
            setImgIsMainCheckedState({...imgIsMainCheckedState, addImg:imageFiles});
      }
    }
      setitems({...items, [name]: value})

    //   console.log(value, addImg, 33333)
  }
  const handleSelectChange = (e, task) => {
      const {name, value} = e.target;
      const childrens = e.target.children
      const itemContent = Array.from(childrens).find(itm => itm.innerText === value)
      return task==='update-brand-id' 
      ? setitems({...items, [name]: value, brandId: itemContent.id})
      : task==='update-category-id'
      ? setitems({...items, [name]: value, categoryId: itemContent.id})
      : null;
  }       
  const HandleImageCheckBox = (e,position, task) => {
    var images = updateImg
    if (!updateImg)images = addImg
    const updatedCheckedState = images.map((obj, index) => {
        return index === position && task === 'is_main' ? {...obj, is_main: !obj.is_main} 
        : index !== position && task === 'is_main' ? {...obj, is_main: false} 
        : index === position && task === 'to_delete' ? {...obj, to_delete: !obj.to_delete}
        : index !== position && task === 'to_delete' ? obj : null
    }); 
    //if block is to ensure when updating, a user chooses a picture before checking is_main box, unless 
    // the is_main box checked belong to initial main pic for the product
    //else  block is the exception where user is adding fresh data
    const correspondingFile = document.querySelector(`.imageUrlFile${position}`)
    if (updateImg){
        if ((correspondingFile.value !== "" || (correspondingFile.value === "" && position === initialImgData.id))){
            setImgIsMainCheckedState({...imgIsMainCheckedState, updateImg:updatedCheckedState});
        } else {
            alert("you have not chosen a file")
        }
    } else {
        setImgIsMainCheckedState({...imgIsMainCheckedState, addImg:updatedCheckedState});
    }
  }
  return(
      <div id="add-item" className="General-Style">
          <h1 style={{marginBottom:'10px'}}>{HEADER}</h1>
          <form onSubmit={handleSubmit}>
              <div className="inner-form-1">
                  <div className="rows">
                      <span className="first">Product type</span>
                      <FormSelect
                          selecttype='MidInputType'
                          type="text"
                          handleSelectChange={(e) => handleSelectChange(e,'update-brand-id')}
                          to_be_selected={brandName}
                          data={product_type_data_array}
                          name="brandName"
                          data_place="product type"/>

                  </div>
                  <div className="rows">
                      <span className="first">Category</span>
                      <FormSelect
                          selecttype='MidInputType'
                          type="text"
                          handleSelectChange={(e) => handleSelectChange(e,'update-category-id')}
                          to_be_selected={categoryName}
                          data={category_data_array}
                          name="categoryName"
                          data_place="category"/>
                  </div>
                  <div className="rows block-row">
                      <span className="first">Title</span>
                      <div className="second">
                          <FormInput  
                              inputtype='BigInputType1'
                              type="text"
                              handleChange={(e) => handleChange(e)}
                              value={ name ? name : ""}  
                              name="name" 
                              required/>
                          <span style={{marginTop:'5px', color:"grey"}}>Required</span>
                      </div>
                  </div>
                  <div className="rows">
                      <span className="first">itemUrl</span>
                      <FormInput  
                          inputtype='BigInputType2'
                          type="text"
                          handleChange={(e) => handleChange(e)}
                          value={itemUrl ? itemUrl : ""} 
                          name="itemUrl" 
                          required/>
                  </div>
                  <div className="rows">
                      <span className="first">Description</span>
                      <textarea 
                          defaultValue={description ? description : ""} 
                          onChange={(e) => handleChange(e)} 
                          name="description" 
                          required/>
                  </div>
                  <div className="rows">
                      <span className="first">Regular Price</span>
                      <FormInput
                          inputtype='SmallInputType'
                          defaultValue={price ? price : ""}  
                          type="number"
                          handleChange={(e) => handleChange(e)}
                          //className="small-input"  
                          name="price" 
                          required />
                  </div>
                  <div className="rows">
                      <span className="first">Discount Price</span>
                      <FormInput 
                          inputtype='SmallInputType'
                          defaultValue={
                          discount_price 
                          ? discount_price 
                          : null
                          } type="number" 
                          handleChange={(e) => handleChange(e)}
                          name="discount_price" 
                          />
                  </div>
                  <div className="rows">
                      <CheckboxInput 
                          checked={is_available}
                          handleChange={(e) => handleChange(e)}
                          name="is_available" 
                          label="Product Availabilty"/>
                   </div>
                  <div className="rows">
                      <CheckboxInput 
                          checked={is_visible}
                          handleChange={(e) => handleChange(e)}
                          name="is_visible" 
                          label="Product Visibilty"/>
                  </div>
              </div>
              <div className="inner-form-2">
                  <div className="top-1">
                      <h1>Product Images</h1>
                      <div className="sub-head"><span style={{width: '40%'}}>IMAGES</span><span>IS MAIN</span><span>DELETE</span></div>
                  </div>
                  <div className="row-list">
                      { updateImg
                      ? updateImg.map(({url, is_main, to_delete}, idx) => (
                          <div key={idx} className="rows">
                              <div className="first">
                                  <span className="top-2">{url ? `${url.length > 20 
                                  ? url.slice(0,25) + '......' : url}` : null }</span>
                                  <div className="bottom">
                                      <input 
                                          className={`parallelWidth imageUrlFile${idx}`} 
                                          role='button' 
                                          type='file'
                                          name={`imageUrlFile${idx}`}
                                          onChange={(e) => handleChange(e,idx)}
                                      />
                                  </div>
                              </div>
                              <CheckboxInput 
                                  checked={is_main}
                                  handleChange={(e) => HandleImageCheckBox(e,idx,'is_main')}
                                  name={`imageUrlIsMain${idx}`}/>
                              <CheckboxInput 
                                  checked={to_delete}
                                  handleChange={(e) => HandleImageCheckBox(e,idx,'to_delete')}
                                  name={`imageUrlDelete${idx}`}/>
                          </div>
                      ))
                      : addImg.map(({url, is_main, to_delete}, idx) => (
                        <div key={idx} className="rows">
                            <div className="first">
                                <span className="top-2">{url ? `${url.length > 20 
                                ? url.slice(0,25) + '......' : url}` : null }</span>
                                <div className="bottom">
                                    <input 
                                        className={`parallelWidth imageUrlFile${idx}`} 
                                        role='button' 
                                        type='file'
                                        name={`imageUrlFile${idx}`}
                                        onChange={(e) => handleChange(e,idx)}
                                    />
                                </div>
                            </div>
                            <CheckboxInput 
                                checked={is_main}
                                handleChange={(e) => HandleImageCheckBox(e,idx,'is_main')}
                                name={`imageUrlIsMain${idx}`}/>
                            <div/>
                        </div>
                    ))
                      }
                  </div>
              </div>
              <div className="footer">
                  {page === "UPDATE-PAGE" 
                  ? <CustomButton type="submit" buttonType="isAdminAdd">Delete</CustomButton > 
                  : <div></div>} <CustomButton type="submit" buttonType="isAdminAdd2">Save</CustomButton >
              </div>
              {/* <div className="product-spec">
                  <div>
                      <h1>Product Specification Values</h1>
                      <div><span>SPECIFICATION</span><span>VALUE</span><span>DELETE</span></div>
                  </div>
                  <div>
                      <div>
                          <div><span>red</span><input /></div><input /><input type="checkbox" />
                      </div>
                      <div>
                          <div><span>red</span><input /></div><input /><input type="checkbox" />
                      </div>
                      <div>
                          <div><span>red</span><input /></div><input /><input type="checkbox" />
                      </div>
                  </div>
              </div> */}
          
          </form>
      </div>
  )
}
const mapStateToProps = createStructuredSelector({
  collection_data: selectShopCollectionsData,
  product_type_data_array: selectShopProductTypeAfterTransformToArray,
  category_data_array: selectShopCategoryAfterTransformToArray,
  current_clicked_item: selectCurrentClickedItem,
})
const mapDispatchToProps = dispatch => ({
  // postItemToFirestoreStart: item => dispatch(postItemToFirestoreStart(item)),
  postDataToFirestoreStart: item => dispatch(postDataToFirestoreStart(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Item);













