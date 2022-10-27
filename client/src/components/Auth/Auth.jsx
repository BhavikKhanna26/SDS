import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
    BrowserRouter,
    Switch,
    Route,
    Router,
    Redirect,
} from "react-router-dom";
import decode from "jwt-decode";

import * as Actions from "../../actions.js";

const Auth = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const [isSignIn, setSignIn] = useState(true);
    // const [0, setForgotPassword] = useState(true); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile:"", 
        password: "",
        confirmPassword: "",
        address: "",
        year: "",
        department: "",
        degree: "",
    });
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
            
        if(formData.confirmPassword !== formData.password && !isSignIn){
            console.log(formData); 
            return ;
                
        }
        if(isSignIn){
            // console.log(formData) 
                
            dispatch(Actions.signIn(formData, history)); 
            // window.location.reload(); 
        }
        else{
            dispatch(Actions.signUp(formData, history)); 
            // window.location.reload(); 
        }
    };
    const change = ()=>{
        setSignIn(!isSignIn); 
    }
    if (currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <div className="h-screen w-full ">
            <div
                className={`bg-green-300 m-auto h-auto w-96 mt-5 mb-5 flex flex-col p-5`}
            >
                <div className={`${(!isSignIn || 0) && "hidden"}`}>
                    <h1 className="text-2xl text-center mb-2">Sign In</h1>
                    <hr></hr>
                    <div className=" ml-5 mt-5">
                        <input
                            className="p-2 w-11/12"
                            placeholder="Name"
                            value={formData.name}
                            name="name"
                            onChange={handleChange}
                        ></input>
                        <p className="text-center mt-1 mb-1">OR</p>
                        <input
                            className="p-2 w-11/12"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                        ></input>
                        <p className="text-center mt-1 mb-1">OR</p>
                        <input
                            className="p-2 w-11/12"
                            placeholder="Mobile"
                            value={formData.mobile}
                            name="mobile"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mt-3 mb-5"
                            placeholder="Password"
                            value={formData.password}
                            name="password"
                            type="password"
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>

                <div className={`${(isSignIn || 0) && "hidden"}`}>
                    <h1 className="text-2xl text-center mb-2">Sign Up</h1>
                    <hr></hr>
                    <div className=" ml-5 mt-5">
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Name"
                            value={formData.name}
                            name="name"
                            onChange={handleChange}
                        ></input>
                        
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                        ></input>
                        
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Mobile"
                            value={formData.mobile}
                            name="mobile"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Password"
                            value={formData.password}
                            name="password"
                            type="password"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Address"
                            value={formData.address}
                            name="address"
                            type="text"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Year"
                            value={formData.year}
                            name="year"
                            type="text"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mb-2"
                            placeholder="Department"
                            value={formData.department}
                            name="department"
                            type="text"
                            onChange={handleChange}
                        ></input>
                        <input
                            className="p-2 w-11/12 mb-5"
                            placeholder="Degree"
                            value={formData.degree}
                            name="degree"
                            type="text"
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                

                <button onClick={handleSubmit} className="w-full bg-green-800 p-3 text-2xl text-bold rounded-full">Submit</button>
                <button className="mt-5" onClick={change}>
                    {isSignIn
                        ? "Don't have an account? Sign up!"
                        : "Already have an account? Sign in!"}
                </button>
                <a href="/forgot_password" className="mx-auto">
                    <button className="mt-5 mx-auto ">
                        Forgot Password? 
                    </button>
                </a>
                
            </div>
        </div>
    );
};
export default Auth;
