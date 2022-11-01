import {React, useState, useEffect} from "react";
import "./sign-in.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as TwitterSvg } from '../asset/twitter.svg';
import { ReactComponent as HelpSvg } from '../asset/help.svg';
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.action"
import CheckboxInput from "../checkbox-input/checkbox-input.component";



const SignIn = ({emailSignInStarti, googleSingInStarti}) => {
    const [userCredential, setUserCredential] = useState({email: '', password: ''})
    
    const {email, password} = userCredential
    const HandleSubmit = async (e) => {
        e.preventDefault()
        emailSignInStarti({email, password})
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setUserCredential({...userCredential, [name]: value})
    }
    const handleOnChange = () => {

    }

    return (
        <div id="sign-in">
            <div id="place-1">
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
                        required  />  
                    <FormInput 
                        shrinkinputtype="true"
                        name="password" 
                        type='password' 
                        handleChange={HandleChange}
                        label="Password"
                        value={password} 
                        required  /> 
                    <div className="block">
                        <CheckboxInput 
                            label="Remember me"
                            value={false}
                            onChange={(e) => handleOnChange}
                            blacklabel="true"
                            />
                        <span><Link className="option" to='/shop'>Forgotten Your Password?</Link></span>
                    </div>

                    <div className="buttons">
                        <CustomButton type="submit" buttonType="isEmailSignIn">Sign in</CustomButton>          
                        <CustomButton type="button" onClick={googleSingInStarti} buttonType="isGoogleSignIn">Sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        
            <span id="split-line"></span>

            <div id="place-2">
                <div className="block">
                    <h1>Open an account</h1>
                    <p>here are some of the benefits you stand to enjoy</p>
                    <div className="fast-checkout">
                        <HelpSvg className="logo help" />
                        <div>
                            <span>Fast checkout</span>
                            <div>Your payment is saved and ready</div>
                        </div>
                    </div>
                    <div className="easy-track">
                        <HelpSvg className="logo help" />
                        <div>
                            <span>Easy order tracking</span>
                            <div>Allows you keep an eye on your order</div>
                        </div>
                    </div>
                    <div className="order-history">
                        <HelpSvg className="logo help" />
                        <div>
                            <span>Order history</span>
                            <div>Saves all your order history saved and one click away</div>
                        </div>
                    </div>

                    <div className="buttons">
                        <Link to="/registeration"><CustomButton type="submit" buttonType="isEmailSignUp">Sign Up</CustomButton></Link>         
                        <CustomButton buttonType="isGoogleSignUp">Create account with google</CustomButton>
                    </div>

                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    googleSignInStarti: () => dispatch(googleSignInStart()),
    emailSignInStarti: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword))
})
export default connect(null, mapDispatchToProps)(SignIn);

// class SignIn extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             email: '',
//             password:''
//         }
//     }

//     handleSubmit = async (e) => {
//         e.preventDefault()
//         const { emailSignInStarti } = this.props;
//         const {email, password} = this.state
//         emailSignInStarti({email, password})
//     }

//     handleChange = (e) => {
//         const {name, value} = e.target;
//         this.setState({[name]: value})
//     }
//     render(){
//         const { googleSingInStarti } = this.props;
//         return (
//             <div id="sign-in">
//                 <div id="place-1">
//                     <h2>I already have an account</h2>
//                     <span>Sign in with your email and password</span>

//                     <form onSubmit={this.handleSubmit}>
//                         <SearchBox 
//                         boxtype="isHomeSigninBox"
//                         name="email" 
//                         type='email' 
//                         handlechange={this.handleChange}
//                         label="Email"
//                         value={this.state.email} 
//                         required  />  
//                         <SearchBox 
//                         boxtype="isHomeSigninBox"
//                         name="password" 
//                         type='password' 
//                         handlechange={this.handleChange}
//                         label="Password"
//                         value={this.state.password} 
//                         required  />  
        
//                         {/* <FormInput name="email" 
//                         type='email' 
//                         handleChange={this.handleChange}
//                         label="Email"
//                         value={this.state.email} 
//                         required />
//                         <FormInput name="password" 
//                         type='password' 
//                         handleChange={this.handleChange}
//                         label="Password"
//                         value={this.state.password} 
//                         required /> */}
//                         <div className="block">
//                         <CheckboxInput 
//                             label="Remember me"
//                             handleChange={(e) => handleOnChange}
//                             blacklabel="true"
//                             />
//                             <span><Link className="option" to='/shop'>Forgotten Your Password?</Link></span>
//                         </div>

//                         <div className="buttons">
//                             <CustomButton type="submit" buttonType="isEmailSignIn">Sign in</CustomButton>          
//                             <CustomButton type="button" onClick={googleSingInStarti} buttonType="isGoogleSignIn">Sign in with google</CustomButton>
//                         </div>
//                     </form>
//                 </div>
            
//                 <span id="split-line"></span>

//                 <div id="place-2">
//                     <div className="block">
//                         <h1>Open an account</h1>
//                         <p>here are some of the benefits you stand to enjoy</p>
//                         <div className="fast-checkout">
//                             <HelpSvg className="logo help" />
//                             <div>
//                                 <span>Fast checkout</span>
//                                 <div>Your payment is saved and ready</div>
//                             </div>
//                         </div>
//                         <div className="easy-track">
//                             <HelpSvg className="logo help" />
//                             <div>
//                                 <span>Easy order tracking</span>
//                                 <div>Allows you keep an eye on your order</div>
//                             </div>
//                         </div>
//                         <div className="order-history">
//                             <HelpSvg className="logo help" />
//                             <div>
//                                 <span>Order history</span>
//                                 <div>Saves all your order history saved and one click away</div>
//                             </div>
//                         </div>

//                         <div className="buttons">
//                             <Link to="/registeration"><CustomButton type="submit" buttonType="isEmailSignUp">Sign Up</CustomButton></Link>         
//                             <CustomButton buttonType="isGoogleSignUp">Create account with google</CustomButton>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapDispatchToProps = dispatch => ({
//     googleSignInStarti: () => dispatch(googleSignInStart()),
//     emailSignInStarti: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword))
// })
// export default connect(null, mapDispatchToProps)(SignIn);