import React from "react";
import "./sign-up.styles.css";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";





class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {
            displayName: '',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {displayName, email, password, confirmPassword} = this.state
        if (password !== confirmPassword) {
            alert("both password do not match")
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName})

            this.setState({
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

    //this function is created with d idea of being reusable get name & value props from the input tag
    handleChange = (e) => {
        console.log('wetin dey sup na')
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className="sign-up">
                <h2>I dont have an account</h2>
                <span>Sign up with your email and password</span>


                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                      type='text'
                      name="displayName"  
                      value={displayName} 
                      handleChange={this.handleChange}
                      label="display name"
                      required />
                    <FormInput name="email" 
                        type='email' 
                        handleChange={this.handleChange}
                        label="Email"
                        value={email} 
                        required />
                    <FormInput name="password" 
                        type='password' 
                        handleChange={this.handleChange}
                        label="Password"
                        value={password} 
                        required />
                    <FormInput name="confirmPassword" 
                        type='password' 
                        handleChange={this.handleChange}
                        label="confirm Password"
                        value={confirmPassword} 
                        required />

                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}
export default SignUp;




