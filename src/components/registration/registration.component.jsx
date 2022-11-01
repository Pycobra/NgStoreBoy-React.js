import {React, useState, useEffect} from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as ShoppingCartSvg5 } from '../asset/shopping-cart5.svg';
import { ReactComponent as TwitterSvg } from '../asset/twitter.svg';
import { ReactComponent as UserSvg } from '../asset/user.svg';
import { auth, signInWithGoogle, createUserProfileDocument } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import "./registration.styles.css";




const Registeration = ({}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [userCredential, setUserCredential] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const {displayName, email, password, confirmPassword} = userCredential
    const HandleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("both password do not match")
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName})

            setUserCredential({
                displayName: '',
                email:'',
                password:'',
                confirmPassword:''
            })
        }
        catch(error){
            console.error(error)
        }
    }

    const HandleChange = (e) => {
        const {name, value} = e.target;
        setUserCredential({...userCredential, [name]: value})
    }

    return (
        <div id="registration">
            <div id="place-1-registration">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={HandleSubmit}>
                    <FormInput 
                        shrinkinputtype="true"
                        name="email" 
                        type='email' 
                        handleChange={HandleChange}
                        label="Email"
                        value={email} 
                        required />
                    <FormInput 
                        shrinkinputtype="true"
                        name="password" 
                        type='password' 
                        handleChange={HandleChange}
                        label="Password"
                        value={password} 
                        required />
                    <FormInput 
                        shrinkinputtype="true"
                        name="password" 
                        type='password' 
                        handleChange={HandleChange}
                        label="Password"
                        value={password} 
                        required />

                    <div className="buttons">
                        <CustomButton type="submit" buttonType="isEmailSignIn">Sign in</CustomButton>          
                    </div>
                </form>
            </div>

            <div id="place-2-registration">
                <span className="terms-condition">By proceeding you agree to our <span>Terms and Conditions</span> and <span>Privacy Policy.</span></span>
                <span style={{display: 'flex', alignItems: 'center'}}><ShoppingCartSvg5 className="logo" /> Already have an account</span>
                <span style={{display: 'flex', alignItems: 'center'}}>Sign in <ShoppingCartSvg5  style={{marginLeft: '5px'}}/></span>

                <div class="security">
                    <ShoppingCartSvg5 className="logo" />
                    <div>
                        <span>Security & Privacy</span>
                        <div>Every transaction on NGStoreboy is secure. any personal information given to us willll be handled according to our privacy policy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Registeration;












// class Registeration extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             email: '',
//             password:''
//         }
//     }

//     handleSubmit = async (e) => {
//         e.preventDefault()
//         const {email, password} = this.state

//         try{
//             await auth.signInWithEmailAndPassword(email, password);
//             this.setState({email: '', password:''})
//         }
//         catch(error){
//             console.log(error)
//         }
//     }

//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value})
//     }
//     render(){
//         return (
//             <div id="registration">
//                 <div id="place-1-registration">
//                     <h2>I already have an account</h2>
//                     <span>Sign in with your email and password</span>

//                     <form onSubmit={this.handleSubmit}>
//                     <SearchBox 
//                         boxtype="isHomeSigninBox"
//                         name="email" 
//                         type='email' 
//                         handleChange={this.handleChange}
//                         label="Email"
//                         value={this.state.email} 
//                         required />
//                     <SearchBox 
//                         boxtype="isHomeSigninBox"
//                         name="password" 
//                         type='password' 
//                         handleChange={this.handleChange}
//                         label="Password"
//                         value={this.state.password} 
//                         required />
//                     <SearchBox 
//                         boxtype="isHomeSigninBox"
//                         name="password" 
//                         type='password' 
//                         handleChange={this.handleChange}
//                         label="Password"
//                         value={this.state.password} 
//                         required />

//                         <div className="buttons">
//                             <CustomButton type="submit" buttonType="isEmailSignIn">Sign in</CustomButton>          
//                         </div>
//                     </form>
//                 </div>

//                 <div id="place-2-registration">
//                     <span className="terms-condition">By proceeding you agree to our <span>Terms and Conditions</span> and <span>Privacy Policy.</span></span>
//                     <span><UserSvg className="logo" /> Already have an account</span>
//                     <span>Sign in <TwitterSvg /></span>

//                     <div class="security">
//                         <TwitterSvg className="logo" />
//                         <div>
//                             <span>Security & Privacy</span>
//                             <div>Every transaction on NGStoreboy is secure. any personal information given to us willll be handled according to our privacy policy</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Registeration;