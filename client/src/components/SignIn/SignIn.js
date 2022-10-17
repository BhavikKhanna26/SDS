import React from "react";
import { useState } from "react";
import './SignIn.css';

const SignIn = () => {

    const [values, setValues] = useState({
        signInEmail: "",
        signInPassword: ""
    })

    const onEmailChange = (event) => {
        setValues({...values, signInEmail : event.target.value});
    }

    const onPasswordChange = (event) => {
        setValues({...values, signInPassword : event.target.value});
    }


    return(
        <div className="SignIn">
            <div className="container">
                <h1>Login</h1>

                <div className="user-info">
                    <label for="email">Email : </label>
                    <input 
                    onChange={onEmailChange} 
                    value={values.signInEmail} 
                    type="text" 
                    name="username" />
                    <br/><br/>
                    <label for="password">Password : </label>
                    <input 
                    onChange = {onPasswordChange}
                    value = {values.signInPassword}
                    type="password" 
                    name="password" />
                </div>
                <div className="login-btn">
                    <a href=""><h4>Login</h4></a>
                </div>
                <div className="sign-up">
                    <h4>Don't have an account? <a href="">Sign up</a></h4>
                </div>
            </div>
        </div>
    );
}

export default SignIn;