import React, {useEffect} from "react";
import "./mobile-view-icon.styles.css";
import { ReactComponent as AppleSvg } from '../asset/apple.svg';
import { ReactComponent as ShoppingCartSvg } from '../asset/shopping-cart1.svg';

// import { ReactComponent as AppleSvg } from '../asset/apple.svg';
// import { ReactComponent as ShoppingCartSvg } from '../asset/shopping-cart1.svg';
import { auth } from "../../firebase/firebase.utils";



class MenuIcon extends React.Component{
    constructor(){
        super()
        this.state = {
            menutimes: false,
            menubar:true
        }
    }

    // handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const {email, password} = this.state

    //     try{
    //         await auth.signInWithEmailAndPassword(email, password);
    //         this.setState({email: '', password:''})
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }
    componentDidMount(){
    }
    

    handleChange = (e) => {
        const {name, value} = e.target.dataset;
        const {className} = e.target;
        const {menubar, menutimes} = this.state
        if (name === "menubar"){
            this.setState({[name] : !value, menutimes: !menutimes})
            document.querySelector('.menu-slide-wrap').setAttribute('style', 'display:flex;left:0;animation: slideMenuBarRight 1s ease-in-out 1;')
        } else {
            this.setState({[name] : !value, menubar: !menubar})
            document.querySelector('.menu-slide-wrap').setAttribute('style', 'display:flex;left:-270px;animation: slideMenuBarLeft 1s ease-in-out 1;')
        }
        // this.setState(() => {
        //     return (className === "menubar icon-cover") ? true : false}
        // )
    }
    render(){
        const {menubar, menutimes} = this.state
        console.log(this.state)
        return (
            <div className="menuicons">
                {
                    menubar
                    
                    ? <span data-name="menubar" data-value={menubar} className="icon1 menubar" onClick={this.handleChange}>&#9776;</span>
                        
                    : <span data-name="menutimes" data-value={menutimes} className="icon2 menutimes" onClick={this.handleChange}>&#10005;</span>
                        
                }
            </div>
        )
    }
}

export default MenuIcon;