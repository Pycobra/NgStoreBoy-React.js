import React from 'react';
import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as Crown } from '../asset/crown.svg';
import {get_search_data} from '../../redux/shop/shop.utils';
import Directory from '../directory-menu/directory-menu.component';
import './collection-search.styles.css'
import CheckboxInput from '../checkbox-input/checkbox-input.component';
import { useEffect, useState } from 'react';
import FormInput from "../form-input/form-input.component";
import FormSelect from '../form-select/form-select.component';
import MiniSearchForm from "../search-form-mini/search-form-mini.component"


//http://localhost:3000/search/g?query=
const CollectionSearch = ({collection_data_array, product_type_data_array, category_data_array, collection_data, 
                        product_type_data, category_data, navigate, location, searchedUrl, searchedId, 
                        searchedInputItem, getCollectionsStart}) => {
    const [stateItems, setStateItems] = useState({IsNotMobileView: true, SideBarHidden: true})
    const [searchType, setSearchType] = useState({category: "", brand: ""})
    const {IsNotMobileView, SideBarHidden } = stateItems
    // const [data, setDataSet] = useState({dataSet:null, fullDataSet:null})
    // const {dataSet, fullDataSet} = data
    const {category, brand} = searchType
    const HandleSideBar =() => {
        setStateItems({SideBarHidden: !SideBarHidden})
    }
    const [categoryCheckedState, setCategoryCheckedState] = useState(
        new Array(category_data_array.length).fill(false)
    );
    const [productTypeCheckedState, setProductTypeCheckedState] = useState(
        new Array(product_type_data_array.length).fill(false)
    );
    const [category_search, setCategorySearch] = useState([]);
    const [product_type_search, setProductTypeSearch] = useState([]);
    const handleOnChange = (position, e, whichData) => {
        if (whichData === "category"){
            console.log(whichData)
            const updatedCheckedState = categoryCheckedState.map((item, index) =>
            index === position ? !item : item
            );
            setCategoryCheckedState(updatedCheckedState);
            const Category = updatedCheckedState.reduce(
            (catArray, currentState, index) => {
            if (currentState === true) {
                catArray.push(category_data_array[index].id)
            }
            return catArray;
            },
            []
            );
            setCategorySearch(Category);
        } else if (whichData === "productType"){
            console.log(whichData)
            const updatedCheckedState = productTypeCheckedState.map((item, index) =>
            index === position ? !item : item
            );
            setProductTypeCheckedState(updatedCheckedState);
            const ProductType = updatedCheckedState.reduce(
            (prodArray, currentState, index) => {
            if (currentState === true) {
                prodArray.push(product_type_data_array[index].id)
            }
            return prodArray;
            },
            []
            );
            setProductTypeSearch(ProductType);
        }
    };
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSearchType({...searchType, [name]: value})
    }
    const datas = get_search_data(collection_data_array, product_type_data_array, 
        category_data_array, collection_data, category_data, product_type_data, 
        category_search, product_type_search, searchedUrl, searchedId, 
        searchedInputItem, location, navigate)
    console.log(document.documentElement.clientWidth)
    useEffect(() => {
        const screenWidth = document.documentElement.clientWidth
        // console.log(screenWidth)
        if (screenWidth <= 768) {
            setStateItems({IsNotMobileView: false})
        }
        }, [])
    // const dataSet = data[0]
    // console.log(fullDataSet)
    const dataSet = datas[0]
    const fullDataSet= datas
    return (
        <section id="collection-search">
            <div className="main-box1">
                <div className="main-head">
                    <div className="main-head-content">
                        <h3>Result for: " {
                                            fullDataSet 
                                            ? `
                                            ${fullDataSet[1].join(' | ')} ${fullDataSet[2].length !== 0 ? '/' : ''} 
                                            ${fullDataSet[2].join(' | ')} ${fullDataSet[3].length !== 0 ? '/' : ''} 
                                            ${fullDataSet[3].join(' | ')} ${fullDataSet[3].length !== 0 ? '/' : ''} 
                                            ${fullDataSet[4].join(' | ')} ${fullDataSet[4].length !== 0 ? '/' : ''}`
                                            : null 
                                            }
                        </h3>
                    </div>
                </div>
                <div className="box" style={{width:'100%'}}>
                    <div className="inside-box">
                        <div className="body-row">
                            <div className={IsNotMobileView ? "laptop" : "mobile"}>
                                {IsNotMobileView 
                                ? null 
                                : <span onClick={() => HandleSideBar()} className="head">selections<Crown style={{marginLeft:"10px"}} /></span>}
                                
                                <div className={`${SideBarHidden ? 'hide-side' : 'show-side'} side`}>
                                    <form method="get" action="">
                                        <div className="btn-hold">
                                            <CustomButton type="submit" buttonType={IsNotMobileView ? "isSearchPageLaptop" : "isSearchPageMobile"}>Filter</CustomButton>
                                            <FormInput 
                                                id={IsNotMobileView ? "list-input" : "list-input-mobile"}
                                                type='hidden'/>
                                        </div>
                                    </form>
                                    <div className="category side2">
                                        <span className=''>Categories</span>
                                        <MiniSearchForm label="search category" />
                                        {   
                                            category_data_array
                                            ? category_data_array.map(({id, name}, idx) => {
                                                // console.log(category_data_array)
                                                // this.CategoriesAmountOfClicks[`ChkBtn-${[category.name]}-${[category.id]}`] = false
                                                // this.state[`ChkBtn-${[name]}-${[id]}`] = false
                                                return (
                                                <span key={idx} className="block">
                                                    <CheckboxInput 
                                                        name={`${name}-${id}${idx}`}
                                                        id={`category-checkbox-${id}${idx}`} 
                                                        label={name}
                                                        value={name}
                                                        checked={categoryCheckedState[idx]}
                                                        handleChange={(e) => handleOnChange(idx, e, 'category')}
                                                        blacklabel="true"
                                                        />
                                                </span>
                                            )})
                                            : null
                                        }
                                    </div>
                                    <div className="brand">
                                        <span>Brands</span>
                                        <MiniSearchForm label="search brands"/>
                                        {   
                                            product_type_data_array
                                            ? product_type_data_array.map(({name, id}, idx) => (
                                                <span key={idx} className="block">
                                                    <CheckboxInput 
                                                        name={`${[name]}-${[id]}`}
                                                        id={`productType-checkbox-${id}`} 
                                                        label={name}
                                                        value={name}
                                                        checked={productTypeCheckedState[idx]}
                                                        handleChange={(e) => handleOnChange(idx, e, 'productType')}
                                                        blacklabel="true"
                                                        />                                                    
                                                </span>
                                            ))
                                            : null
                                        }
                                    </div>
                                    {/* <div className="size">
                                        <span>Size</span>
                                        <form method="get" action="">
                                            <div className="search-field">
                                                <button className={`${IsNotMobileView ? "size-icon" : "size-icon-mobile"} icon`}><Crown /></button>
                                                <input type="text" className={`${IsNotMobileView ? "searchInput" : "size-input-mobile"} input`} placeholder="Search" name="sub_query" />
                                            </div>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="S" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="S" style={{fontSize:'13px'}}>S</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index=" M" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="M" style={{fontSize:'13px'}}>M</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="L" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="L" style={{fontSize:'13px'}}>L</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="X" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="X" style={{fontSize:'13px'}}>X</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="XL" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="XL" style={{fontSize:'13px'}}>XL</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="XXL" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="XXL" style={{fontSize:'13px'}}>XXL</span>
                                            </span>
                                    </form>
                                    </div>
                                    <div className="discount">
                                        <span>Discount</span>
                                        <form method="get" action="">
                                            <div className="search-field">
                                                <button className={`${IsNotMobileView ? "discount-icon" : "discount-icon-mobile"} icon`}><Crown /></button>
                                                <input type="text" className={`${IsNotMobileView ? "discount-input" : "discount-input-mobile"} icon`} placeholder="Search" name="sub_query" />
                                            </div>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 10%" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 10%" style={{fontSize:'13px'}}>1% - 10%</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 20%" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 20%" style={{fontSize:'13px'}}>10% - 20%</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 30%" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 30%" style={{fontSize:'13px'}}>20% - 30%</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 40%" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 40%" style={{fontSize:'13px'}}>30% - 40%</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 50%" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 50%" style={{fontSize:'13px'}}>40% - 50%</span>
                                            </span>
                                            <span>
                                                <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 60%" style={{fontSize:'15px', marginRight:'11px'}} />
                                                <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 60%" style={{fontSize:'13px'}}>50% - 60%</span>
                                            </span>
                                        </form>
                                    </div> */}
                                </div>
                                
                                <div className="other-box" id="top-selling-container">
                                {
                                    dataSet.length !== 0
                                    ?   <div className="inner-box">
                                            <div className="box-header">
                                                <span className="item1">{dataSet.length} items found</span>
                                                <div className="item2">
                                                    <span>Sort:</span>
                                                    <FormSelect
                                                        selecttype='MidInputType2'
                                                        type="text"
                                                        data={[{name:'Date'}, {name:'12 / 29 / 22'}]}
                                                        name="Date"/>
                                                </div>
                                            </div>
                                            <Directory search_data={dataSet}/>
                                        </div>
                                    :  !searchedUrl
                                    ? <p>You searched for nothing</p>
                                    :  <p>we dont have the searched item</p>
                                }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CollectionSearch;






{/* <form method="get" action="">
<div className="search-field">
    <MiniSearchForm />
    <CustomButton 
        type="submit" 
        buttonType="CollectionSearchIcon">
        <Crown />
    </CustomButton>
    <FormInput type="text"  
        inputtype='RoundBorderType'                                                    handleChange={(e) => handleChange(e)} 
        value={category}
        name="category" 
        />
</div>
{   
    category_data_array
    ? category_data_array.map(({id, name}, idx) => {
        return (
        <span key={idx} className="block">
            <CheckboxInput 
                name={`${name}-${id}${idx}`}
                id={`category-checkbox-${id}${idx}`} 
                label={name}
                value={name}
                checked={categoryCheckedState[idx]}
                handleChange={(e) => handleOnChange(idx, e, 'category')}
                blacklabel="true"
                />
        </span>
    )})
    : null
}
</form> */}




// class CollectionSearch extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             IsNotMobileView: true,
//             SideBarHidden: true,
//             CategoryCheckBtnClicked: [],
//             ProductTypeCheckBtnClicked: []
//         }
//     }
//     componentDidMount(){
//         const screenWidth = document.documentElement.clientWidth
//         if (screenWidth <= 500) {
//             this.setState({IsNotMobileView: false})
//         }
//     }
//     HandleSideBar(){
//         this.setState({SideBarHidden: !this.state.SideBarHidden})
//     }
//     // CategoryCheckBtnClicked = []
//     // ProductTypeCheckBtnClicked = []
//     ActivateCheckbutton = (btn, handleChkBtnFromSearchStart, e,) => {
//         // e.preventDefault()
//         if (e.target.value === "on"){
//             if (btn === "category_search"){
//                 this.state.CategoryCheckBtnClicked.includes(e.target.name) 
//                 ? this.state.CategoryCheckBtnClicked.pop(e.target.name) 
//                 : this.state.CategoryCheckBtnClicked.push(e.target.name)
                
//                 this.state.CategoryCheckBtnClicked.includes(e.target.name) 
//                 ? handleChkBtnFromSearchStart({category_search: e.target.id, doWhat: 'APPEND'}) 
//                 : handleChkBtnFromSearchStart({category_search: e.target.id, doWhat: 'REMOVE'})             
//                 // this.setState({[`${e.target.name}`]: true})
//             } 
//             if (btn === "product_type_search"){
//                 this.state.ProductTypeCheckBtnClicked.includes(e.target.name) 
//                 ? this.state.ProductTypeCheckBtnClicked.pop(e.target.name) 
//                 : this.state.ProductTypeCheckBtnClicked.push(e.target.name)
                
//                 this.state.ProductTypeCheckBtnClicked.includes(e.target.name) 
//                 ? handleChkBtnFromSearchStart({product_type_search: e.target.id, doWhat: 'APPEND'}) 
//                 : handleChkBtnFromSearchStart({product_type_search: e.target.id, doWhat: 'REMOVE'})             
//                 // this.setState({[`${e.target.name}`]: true})
//             }
//         }
//         // else {
//         //     console.log("figure this out once you find why d btn isnt checking")
//         //     if (btn === "category_search"){
//         //         getCollectionsStart({remove_category_search: id})
//         //     } else if (btn === "product_type_search"){
//         //         getCollectionsStart({remove_product_type_search: id})
//         //     }
//         // }
//     }

//     render(){
//             const {collection_data_array, product_type_data_array, category_data_array, collection_data, 
//                 product_type_data, category_data, productTypeCheckButton, categoryCheckButton, 
//                 getCollectionsStart, navigate, location, searchedUrl, searchedId, searchedInputItem, 
//                 handleChkBtnFromSearchStart} = this.props

//             const data = get_search_data(collection_data_array, product_type_data_array, category_data_array, 
//                                 collection_data, category_data, product_type_data, categoryCheckButton, 
//                                 productTypeCheckButton, searchedUrl, searchedId, searchedInputItem, 
//                                 location, navigate)

//             const {IsNotMobileView, SideBarHidden} = this.state
//             const dataSet = data[0]
//             const fullDataSet = data
//             console.log(SideBarHidden)
//             return (
//                 <section id="collection-search">
//                     <div className="main-box1">
//                         <div className="main-head">
//                             <div className="main-head-content">
//                                 <h3>Result for: " {
                                            // fullDataSet 
                                            // ? `
                                            // ${fullDataSet[1].join(' | ')} ${fullDataSet[2].length !== 0 ? '/' : ''} 
                                            // ${fullDataSet[2].join(' | ')} ${fullDataSet[3].length !== 0 ? '/' : ''} 
                                            // ${fullDataSet[3].join(' | ')} ${fullDataSet[3].length !== 0 ? '/' : ''} 
                                            // ${fullDataSet[4].join(' | ')} ${fullDataSet[4].length !== 0 ? '/' : ''}`
                                            // : null 
                                            // } 
//                                 </h3>
//                             </div>
//                         </div>
//                         <div className="box" style={{width:'100%'}}>
//                             <div className="inside-box">
//                                 <div className="body-row">
//                                     <div className={IsNotMobileView ? "laptop" : "mobile"}>
//                                         {IsNotMobileView 
//                                         ? null 
//                                         : <span onClick={() => this.HandleSideBar()} className="head">selections<Crown style={{marginLeft:"10px"}} /></span>}
                                        
//                                         {/* {IsNotMobileView  SideBarHidden*/}
//                                         <div className={`${SideBarHidden ? 'hide-side' : 'show-side'} side`}>
//                                             <form method="get" action="">
//                                                 <div className="btn-hold">
//                                                     <CustomButton type="submit" buttonType={IsNotMobileView ? "isSearchPageLaptop" : "isSearchPageMobile"}>Filter</CustomButton>
//                                                     <input type="hidden" id={IsNotMobileView ? "list-input" : "list-input-mobile"} name="query"/>
//                                                 </div>
//                                             </form>
//                                             <div className="category side2">
//                                                 <span>Categories</span>
//                                                 <div className="search-field">
//                                                     <button className="icon brand-icon"><Crown /></button>
//                                                     <input type="text"  className="input brand-icon" placeholder="Search" name="query" />
//                                                 </div>
//                                                 {   
//                                                     category_data_array
//                                                     ? category_data_array.map(({id, name}, idx) => {
//                                                         console.log(category_data_array)
//                                                         // this.CategoriesAmountOfClicks[`ChkBtn-${[category.name]}-${[category.id]}`] = false
//                                                         this.state[`ChkBtn-${[name]}-${[id]}`] = false
//                                                         return (
//                                                         <span key={idx} className="block">
                                                            
//                                                             <CheckboxInput 
//                                                                 name={`ChkBtn-${[name]}-${[id]}`}
//                                                                 id={`custom-checkbox-${id}`} 
//                                                                 label={name}
//                                                                 value={name}
//                                                                 checked={checkedState[index]}
//                                                                 handleChange={() => handleOnChange(index)}
//                                                                 blacklabel="true"
//                                                                 />
//                                                             {/* <input 
//                                                                 name={`ChkBtn-${[category.name]}-${[category.id]}`}
//                                                                 id={category.id} 
//                                                                 onClick={(e) => {
//                                                                     this.ActivateCheckbutton("category_search", handleChkBtnFromSearchStart, e)
//                                                                 }}
//                                                                 className="searchInput brand-value" 
//                                                                 data-index={category.name} type="checkbox" 
//                                                                 style={{fontSize:'15px', marginRight:'11px'}}/> */}
//                                                             {/* <span className="checkbtn-txt" style={{fontSize:'13px'}}>{category.name}</span> */}
//                                                         </span>
//                                                     )})
//                                                     : null
//                                                 }
//                                             </div>
//                                             <div className="brand">
//                                                 <span>Brands</span>
//                                                 <form method="get" action="">
//                                                     <div className="search-field">
//                                                         <button className={`${IsNotMobileView ? "brand-icon" : "brand-icon-mobile"} icon`}><Crown /></button>
//                                                         <input type="text" className={`${IsNotMobileView ? "brand-input" : "brand-input-mobile"} input`} placeholder="Search" name="query" />
//                                                     </div>
//                                                     {   
//                                                         product_type_data_array
//                                                         ? product_type_data_array.map((product_type, idx) => (
//                                                             <span key={idx} className="block">
//                                                                 <CheckboxInput 
//                                                                     checked={false}
//                                                                     name={`ChkBtn-${[product_type.name]}-${[product_type.id]}`}
//                                                                     id={product_type.id} 
//                                                                     label={product_type.name}
//                                                                     blacklabel="true"
//                                                                     handleChange={(e) => this.ActivateCheckbutton("product_type_search", handleChkBtnFromSearchStart, e)}/>
//                                                                 {/* <input 
//                                                                     name={`ChkBtn-${[product_type.name]}-${[product_type.id]}`}
//                                                                     id={product_type.id} 
//                                                                     onClick={(e) => this.ActivateCheckbutton("product_type_search", handleChkBtnFromSearchStart, e)}
//                                                                     className={`${IsNotMobileView ? "searchInput brand-value" 
//                                                                                                   : "searchInput-mobile brand-value-mobile"}`} 
//                                                                     data-index={ product_type.name } 
//                                                                     type="checkbox" 
//                                                                     style={{fontSize:'15px', marginRight:'11px'}}
//                                                                 /> */}
//                                                                 {/* <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} style={{fontSize:'13px'}}>{product_type.name}</span> */}
//                                                             </span>
//                                                         ))
//                                                         : null
//                                                     }
//                                                 </form>
//                                             </div>
//                                             {/* <div className="size">
//                                                 <span>Size</span>
//                                                 <form method="get" action="">
//                                                     <div className="search-field">
//                                                         <button className={`${IsNotMobileView ? "size-icon" : "size-icon-mobile"} icon`}><Crown /></button>
//                                                         <input type="text" className={`${IsNotMobileView ? "searchInput" : "size-input-mobile"} input`} placeholder="Search" name="sub_query" />
//                                                     </div>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="S" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="S" style={{fontSize:'13px'}}>S</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index=" M" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="M" style={{fontSize:'13px'}}>M</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="L" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="L" style={{fontSize:'13px'}}>L</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="X" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="X" style={{fontSize:'13px'}}>X</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="XL" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="XL" style={{fontSize:'13px'}}>XL</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput size-value" : "search-input-mobile size-value-mobile"}`} data-index="XXL" role="button" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="XXL" style={{fontSize:'13px'}}>XXL</span>
//                                                     </span>
//                                             </form>
//                                             </div>
//                                             <div className="discount">
//                                                 <span>Discount</span>
//                                                 <form method="get" action="">
//                                                     <div className="search-field">
//                                                         <button className={`${IsNotMobileView ? "discount-icon" : "discount-icon-mobile"} icon`}><Crown /></button>
//                                                         <input type="text" className={`${IsNotMobileView ? "discount-input" : "discount-input-mobile"} icon`} placeholder="Search" name="sub_query" />
//                                                     </div>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 10%" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 10%" style={{fontSize:'13px'}}>1% - 10%</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 20%" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 20%" style={{fontSize:'13px'}}>10% - 20%</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 30%" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 30%" style={{fontSize:'13px'}}>20% - 30%</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 40%" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 40%" style={{fontSize:'13px'}}>30% - 40%</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 50%" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 50%" style={{fontSize:'13px'}}>40% - 50%</span>
//                                                     </span>
//                                                     <span>
//                                                         <input type="checkbox" className={`${IsNotMobileView ? "searchInput discount-value" : "search-input-mobile discount-value-mobile"}`} data-index="< 60%" style={{fontSize:'15px', marginRight:'11px'}} />
//                                                         <span className={`${IsNotMobileView ? "checkbtn-txt" : "checkbtn-txt-mobile"}`} data-index="< 60%" style={{fontSize:'13px'}}>50% - 60%</span>
//                                                     </span>
//                                                 </form>
//                                             </div> */}
//                                         </div>
                                        
//                                         <div className="other-box" id="top-selling-container">
//                                         {
//                                             dataSet
//                                             ?   <div className="inner-box">
//                                                     <div className="box-header">
//                                                         <span className="item1">{dataSet.length} items found</span>
//                                                         <div className="item2">
//                                                             <span>Sort:</span>
//                                                             <select>
//                                                                 <option>date</option>
//                                                                 <option>date</option>
//                                                                 <option>date and time</option>
//                                                                 <option>date</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                     <Directory search_data={dataSet}/>
//                                                 </div>
//                                             :  !searchedUrl
//                                             ? <p>You searched for nothing</p>
//                                             :  <p>we dont have the searched item</p>
//                                         }
//                                         </div>
//                                     </div>
        
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             )
//     }
// }
// export default CollectionSearch;









// const ActivateCheckbutton = (btn, handleChkBtnFromSearchStart, e,) => {
//     // e.preventDefault()
//     if (e.target.value === "on"){
//         if (btn === "category_search"){
//             CategoryCheckBtnClicked.includes(e.target.name) 
//             ? CategoryCheckBtnClicked.pop(e.target.name) 
//             : CategoryCheckBtnClicked.push(e.target.name)
            
//             CategoryCheckBtnClicked.includes(e.target.name) 
//             ? handleChkBtnFromSearchStart({category_search: e.target.id, doWhat: 'APPEND'}) 
//             : handleChkBtnFromSearchStart({category_search: e.target.id, doWhat: 'REMOVE'})             
//             // this.setState({[`${e.target.name}`]: true})
//         } 
//         if (btn === "product_type_search"){
//             ProductTypeCheckBtnClicked.includes(e.target.name) 
//             ? ProductTypeCheckBtnClicked.pop(e.target.name) 
//             : ProductTypeCheckBtnClicked.push(e.target.name)
            
//             ProductTypeCheckBtnClicked.includes(e.target.name) 
//             ? handleChkBtnFromSearchStart({product_type_search: e.target.id, doWhat: 'APPEND'}) 
//             : handleChkBtnFromSearchStart({product_type_search: e.target.id, doWhat: 'REMOVE'})             
//             // this.setState({[`${e.target.name}`]: true})
//         }
//     }
//     // else {
//     //     console.log("figure this out once you find why d btn isnt checking")
//     //     if (btn === "category_search"){
//     //         getCollectionsStart({remove_category_search: id})
//     //     } else if (btn === "product_type_search"){
//     //         getCollectionsStart({remove_product_type_search: id})
//     //     }
//     // }
// }