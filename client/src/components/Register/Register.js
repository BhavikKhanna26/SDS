import React from "react";
import { useState } from "react";
import './Register.css';

const Register = () => {

    const [values, setValues] = useState({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: ""
    })

    const onNameChange = (event) => {
        setValues({...values, registerName : event.target.value});
    }

    const onEmailChange = (event) => {
        setValues({...values, registerEmail : event.target.value});
    }

    const onPasswordChange = (event) => {
        setValues({...values, registerPassword : event.target.value});
    }

    const onConfirmPasswordChange = (event) => {
        setValues({...values, registerConfirmPassword : event.target.value});
    }

    const onSubmitSignIn = () => {
        
    }

    return(
        <div className="Register">
            <div className="container">
                <h1>Register</h1>

                <div className="user-info">
                    <label for="name">Enter your name : </label>
                    <input 
                    onChange = {onNameChange}
                    value = {values.registerName}
                    type="text" 
                    name="name" />
                    <br/><br/>
                    <label for="email">Enter your email : </label>
                    <input 
                    onChange = {onEmailChange}
                    value = {values.registerEmail}
                    type="text" 
                    name="email" />
                    <br/><br/>
                    <label for="password">Enter your password : </label>
                    <input 
                    onChange = {onPasswordChange}
                    value = {values.registerPassword}
                    type="password" 
                    name="password" />
                    <br/><br/>
                    <label for="confirm-pass">Confirm password : </label>
                    <input 
                    onChange = {onConfirmPasswordChange}
                    value = {values.registerConfirmPassword}
                    type="password" 
                    name="confirm-pass" />
                    <br/><br/>
                </div>

                <div className="submit-btn">
                    <h4>Submit</h4>
                </div>

                <div className="sign-in">
                    <h4>Already have an account? <a href="">Login</a></h4>
                </div>
            </div>
        </div>
    );
}

export default Register;