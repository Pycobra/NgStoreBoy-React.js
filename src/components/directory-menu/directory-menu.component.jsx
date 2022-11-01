import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import "./directory-menu.styles.css"
import { selectProductList, selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";
import { createStructuredSelector} from "reselect"; 
import { ReactComponent as ShoppingCartSvg } from '../../components/asset/shopping-cart3.svg';
import WithShinningBox from '../with-shinning-box/with-shinning-box.component';





const UseWindow = window.onscroll = function(event) {
    return "useWindow"
}

class Directory extends React.Component {
    constructor(){
        super()
        this.state = {
            nextDataSet: undefined,
            nonScrollIdName: 'directory-menu',
            nonScrollClassName: 'menu-item-card',
            ScrollClassName: "",
            ScrollIdName: "",
            thisList: [],
        }
    }
    componentDidMount(){
        // console.log('Abc2')
        // const {search_data, obj } = this.props
        // search_data ? this.setState({DataSet: search_data}) : this.setState({DataSet: this.HandleHomePage(obj.items)}) 
    }
    HandleHomePage(items){
        // return Object.keys(otherItemsProps.items).map(key => otherItemsProps.items[key])
        // .filter((itm, idx) => idx <= 9)

        return items.map(itm => itm).filter((itm, idx) => idx <= 9)
    }
    // hold = console.log(document.querySelector('directory-menu'))
    holding = (e) => {
        console.log(e.target.getBoundingClientRect())
    }
    Holder = window.onscroll = () => {
        const {ScrollClassName, nonScrollClassName, nonScrollIdName, thisList} = this.state
        // const directory = document.querySelector(".directory-menu")
        // const ScrollClassName = directory.getAttribute('data')
        const allCards = document.querySelectorAll(`.${nonScrollIdName}`)
        allCards.forEach(i => {
            thisList.push({item: i, pos: i.offsetTop})
        })
        const thisList2 = [...new Set(thisList)]
        // console.log(allCards)
        thisList2.forEach(i => {
            // console.log(window.scrollY)
            // console.log(i.pos)
            if (window.scrollY === i.pos){
                // console.log("this items now match the scrollbar! this items now match the scrollbar!")
                // console.log("====================================================")
                // console.log("====================================================")
                // console.log("====================================================")
                // console.log("====================================================")
                // console.log("====================================================")
                // console.log("this items now match the scrollbar! this items now match the scrollbar!")
                const singleCard = document.querySelector(`#${i.item.id}`)
                const content = Array.from(singleCard.children).find((kids, idx) => idx === 1)
                Array.from(content.children).map(itm => {
                    itm.classList.add('card-scroll')
                    itm.scrollTo(0, 500)
                    return itm
                })
                // singleCard.children('div.directory-collections').map(itm => {
                //     console.log(itm)
                // })
                
                
                this.setState({ScrollClassName: "card-scroll menu-item-card"})
            }
        })
    }
    MenuItemWithShinner = WithShinningBox(MenuItem)
    HandleClick(e){
        const {search_data, obj } = this.props
        this.setState({DataSet: obj.items.map(itm => itm).filter((itm, idx) => idx <= 9)})
    }
    render() {
        const {page, search_data, obj, isCollectionFetching } = this.props
        var DataSet = null
        search_data ? DataSet= search_data : DataSet= this.HandleHomePage(obj.items)

        if (!search_data){
             var {categoryId, categoryName} = obj
        }
        const {ScrollClassName, nonScrollClassName, nonScrollIdName} = this.state
        return (
            <div onClick={(e) => this.holding(e)} className={nonScrollIdName} id={categoryName + '-' + categoryId}>
                {   categoryName 
                    ? <div className='head'><h1 className='title'>{categoryName.toUpperCase()}</h1>
                        <span onClick={(e) => this.HandleClick(e)} className='aside'>See more {'>>'} </span></div>
                    : null
                }
                <div className='directory-collections'>
                    {   
                        DataSet
                        ? DataSet.map((itemData, idx) => {
                            return (
                            <this.MenuItemWithShinner useID={idx} useClass={nonScrollClassName} isLoading={isCollectionFetching} key={idx} itemData={itemData} {...itemData} page={page} />
                        )})
                        : null
                    }
                </div>
            </div>)
    }
}
// export default Directory;
const mapStateToProps = createStructuredSelector ({
    isCollectionFetching: selectIsCollectionFetching,
})
export default connect(mapStateToProps)(Directory);

