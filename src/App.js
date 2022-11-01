import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Homepage from './pages2/homepage/homepage.component.jsx';
import Header from './components/header/header.component.jsx';
import Footer from './components/footer/footer.component.jsx';
import Registeration from './components/registration/registration.component.jsx';
import SearchPage  from './pages2/search-page/search-page.component.jsx';
import CheckoutPage from './pages2/checkout-page/checkout-page.component.jsx';
import SignIn from "./components/sign-in/sign-in.component";
import SellPage from "./components/sell/sell.component";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector.js';
import './App.css';
import AdminSection from './pages2/admin-page/admin-page.component.jsx';
import { fetchCollectionsStart, 
  fetchCategoryStart, 
  fetchProductTypesStart } from './redux/shop/shop.action.js';
import { setCurrentUser, checkUserSession } from './redux/user/user.action.js';
import { fetchFirebaseNetworkStatusStart } from './redux/firebase-redux/firebase-redux.action.js';
import FetchCollectionPage from './pages2/fetch-collection-page/fetch-collection-page.jsx';
import MenubarSlide from './components/menubar-slide/menubar-slide.component.jsx';
import { auth, createUserProfileDocument, addCollectionAndDocument } from './firebase/firebase.utils'
import ItemPage from './pages2/item-page/item-page.component.jsx';
import WishListAndLikes from './components/wishlist/wishlist.component.jsx';
import { selectShopCollectionArrayToFirebase,
  // selectShopProductTypeArrayToFirebase,
  // selectShopCategoryArrayToFirebase 
} from './redux/shop/shop.selectors.js';
import { selectCartAddSuccessAlert } from "./redux/cart/cart.selector";
import Popup from "./components/popup/popup.component";

// import CollectionSearch  from "./components/collection-search/collection-search2.component.";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//<div><FontAwesomeIcon icon={faHome} /> </div>
// const imageList = ["img1", "img2", "img3", ... ]
// {
//   imageList.map(img => {
//     return <img src={require("../assets/images/" + img + ".jpg")} />
//   })
// }



class App extends React.Component {
  constructor(){
    super()
    this.state = {}
  }
  unsuscribeFromAuth = null

  componentDidMount(){
    const { checkUserSession, fetchFirebaseNetworkStatusStart, collection_data_toFirebase, 
      category_data_toFirebase, product_type_data_toFirebase, fetchCollectionsStart, 
      fetchCategoryStart, fetchProductTypesStart } = this.props
    fetchFirebaseNetworkStatusStart()
    checkUserSession()
    fetchCategoryStart()
    fetchProductTypesStart()
    fetchCollectionsStart()

    // console.log(category_data)
    // console.log(product_type_data)
    // console.log(collection_data)
    // addCollectionAndDocument('categories', category_data_toFirebase)
    // addCollectionAndDocument('product types', product_type_data_toFirebase)
    // addCollectionAndDocument('collections', collection_data_toFirebase)
  }

  
  render(){
    const { alert, isCollectionFetching } = this.props

    return (
      <div className='app'>
      <Router>
          <Header currentUser={this.state.currentUser}/>
          <MenubarSlide />
          <section id='container'>
            {alert ? <Popup style={{zIndex:'10'}}>item was added to your cart</Popup> : null} 
            <Routes>
                <Route path='NgStoreBoy-React.js/*' element={<FetchCollectionPage/>} /> 
                {/* <Route path='/' element={<Homepage/>} />            */}
                <Route path='NgStoreBoy-React.js/registeration' element={<Registeration/>} />            
                {/* <Route path='/search/*' element={<CollectionSearch/>} /> */}
                <Route path='NgStoreBoy-React.js/search/*' element={<SearchPage/>} />           
                {/* <Route path='/items/*' element={<ItemPage/>} />            */}
                <Route path='NgStoreBoy-React.js/sell-page' element={<SellPage/>} />           
                <Route path='NgStoreBoy-React.js/login' element={<SignIn/>} />
                {/* <Route path='/registeration' element={this.props.currentUser ? <Navigate to="/" replace /> : <Registeration/>} /> */}
                <Route path='NgStoreBoy-React.js/checkout/*' element={<CheckoutPage/>} />         
                <Route path='NgStoreBoy-React.js/admin/*' element={<AdminSection/>} />
            </Routes>
            <Footer />
          </section>
      </Router>
      </div>
    );
  };
};

const mapStateToProps = createStructuredSelector({
  alert: selectCartAddSuccessAlert,
  currentUser: selectCurrentUser,
  collection_data_toFirebase: selectShopCollectionArrayToFirebase,
  // product_type_data_toFirebase: selectShopProductTypeArrayToFirebase,
  // category_data_toFirebase: selectShopCategoryArrayToFirebase,
})
const mapDispatchToProps = dispatch => ({
     setCurrentUser: user => dispatch(setCurrentUser(user)),
     checkUserSession: () => dispatch(checkUserSession()),
     fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
     fetchCategoryStart: () => dispatch(fetchCategoryStart()),
     fetchProductTypesStart: () => dispatch(fetchProductTypesStart()),
     fetchFirebaseNetworkStatusStart: () => dispatch(fetchFirebaseNetworkStatusStart()),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);


































// const App = (checkUserSession, fetchFirebaseNetworkStatusStart, collection_data_toFirebase, 
//     category_data_toFirebase, product_type_data_toFirebase, fetchCollectionsStart, 
//     fetchCategoryStart, fetchProductTypesStart) => {

//     useEffect(() => {
//       if (searchQuery.length > 0){
//         fetchFirebaseNetworkStatusStart()
//         checkUserSession()
//         fetchCategoryStart()
//         fetchProductTypesStart()
//         fetchCollectionsStart()
    
//         // console.log(category_data)
//         // console.log(product_type_data)
//         // console.log(collection_data)
//         // addCollectionAndDocument('categories', category_data_toFirebase)
//         // addCollectionAndDocument('product types', product_type_data_toFirebase)
//         // addCollectionAndDocument('collections', collection_data_toFirebase)
//       };
//       }, [fetchFirebaseNetworkStatusStart,
//           checkUserSession,
//           fetchCategoryStart,
//           fetchProductTypesStart,
//           fetchCollectionsStart]
//     )

//     return (
//       <div className='app'>
//       <Router>
//           <Header currentUser={this.state.currentUser}/>
        
//           <section id='container'>
//             <Routes>
//                 <Route path='/*' element={<FetchCollectionPage/>} /> 
//                 {/* <Route path='/' element={<Homepage/>} />            */}
//                 <Route path='/registeration' element={<Registeration/>} />            
//                 {/* <Route path='/search/*' element={<CollectionSearch/>} /> */}
//                 <Route path='/search/*' element={<SearchPage/>} />           
//                 {/* <Route path='/items/*' element={<ItemPage/>} />            */}
//                 <Route path='/sell-page' element={<SellPage/>} />           
//                 <Route path='/login' element={<SignIn/>} />
//                 {/* <Route path='/registeration' element={this.props.currentUser ? <Navigate to="/" replace /> : <Registeration/>} /> */}
//                 <Route path='/checkout' element={<CheckoutPage/>} />         
//                 <Route path='/admin/*' element={<AdminSection/>} />
//             </Routes>
//             <Footer />
//           </section>
//       </Router>
//       </div>
//     );
// };

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   // collection_data_toFirebase: selectShopCollectionArrayToFirebase,
//   // product_type_data_toFirebase: selectShopProductTypeArrayToFirebase,
//   // category_data_toFirebase: selectShopCategoryArrayToFirebase,
// })
// const mapDispatchToProps = dispatch => ({
//      setCurrentUser: user => dispatch(setCurrentUser(user)),
//      checkUserSession: () => dispatch(checkUserSession()),
//      fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
//      fetchCategoryStart: () => dispatch(fetchCategoryStart()),
//      fetchProductTypesStart: () => dispatch(fetchProductTypesStart()),
//      fetchFirebaseNetworkStatusStart: () => dispatch(fetchFirebaseNetworkStatusStart()),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(App);










//  cd C:\Users\BRIGHT\PycharmProjects\pythonProject\game
//  C:\Users\BRIGHT\PycharmProjects\pythonProject\game\Scripts\activate
//  cd C:\Users\BRIGHT\PycharmProjects\pythonProject\game\mysite
//  cd C:\Users\BRIGHT\PycharmProjects\pythonProject\game\travel
//  cd C:\Users\BRIGHT\PycharmProjects\pythonProject\game\restaurant
//  python manage.py makemigrations
//  python manage.py migrate
//  python manage.py runserver
//  python manage.py createsuperuser
//  guht9876 2@2.com admin
//  python manage.py makemigrations --check
//  django-admin startproject mysite
//  django-admin startapp
//  madrid111
//  5c0477224687 = wifi
//  cd ~/.vscode/reactsite 
//  zone-tech-park saturday 10.00am register:bit.ly/gocloudwithaws num:08180010481 visit:mackingtouch.com
//  cocacola send code to ==> 8014*1*4# OR 8014*1*1# OR 8014*1*140659636436#
//  http://localhost:3000/search/g?query=
//  git@github.com:Pycobra/monsters-rolodex.git



// id: 1,"Addidas",
// id: 2,"Nike",
// id: 3,"Tommy Hilfiger",
// id: 4,"Givenchy",
// id: 5,"Gucci",
// id: 6,"Lucci",
// id: 7,"Luis Vuiton",
// id: 8,"Fendi",
// id: 9,"Dolce and Gabana"






// const UseEffectExample = () => {
//     const [user, setUser] = useState(null)
//     const [searchQuery, setSearchQuery] = useSate('')

//     useEffect(() => {
//       if (searchQuery.length > 0){
//         const fetchFunct = async () => {
//           const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${searchQuery}`)
//           const resJson = await response.json();
//           setUser(resJson[0])
//         } 
//         fetchFunct();
//       };
      
//     }, [searchQuery]
//     )
// }






// import { useState } from "react";
// import { toppings } from "./utils/toppings";
// import "./styles.css";

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

// export default function App() {
//   const [checkedState, setCheckedState] = useState(
//     new Array(toppings.length).fill(false)
//   );
//   const [total, setTotal] = useState(0);

//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item
//     );
//     setCheckedState(updatedCheckedState);
//     const totalPrice = updatedCheckedState.reduce(
//       (sum, currentState, index) => {
//         if (currentState === true) {
//           return sum + toppings[index].price;
//         }
//         return sum;
//       },
//       0
//     );
//     setTotal(totalPrice);
//   };

//   return (
//     <div className="App">
//       <h3>Select Toppings</h3>
//       <ul className="toppings-list">
//         {toppings.map(({ name, price }, index) => {
//           return (
//             <li key={index}>
//               <div className="toppings-list-item">
//                 <div className="left-section">
//                   <input
//                     type="checkbox"
//                     id={`custom-checkbox-${index}`}
//                     name={name}
//                     value={name}
//                     checked={checkedState[index]}
//                     onChange={() => handleOnChange(index)}
//                   />
//                   <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
//                 </div>
//                 <div className="right-section">{getFormattedPrice(price)}</div>
//               </div>
//             </li>
//           );
//         })}
//         <li>
//           <div className="toppings-list-item">
//             <div className="left-section">Total:</div>
//             <div className="right-section">{getFormattedPrice(total)}</div>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// }               
























