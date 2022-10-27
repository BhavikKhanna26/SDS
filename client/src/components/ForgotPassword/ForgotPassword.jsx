import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import decode from 'jwt-decode';

import * as Actions from "../../actions.js";

const ForgotPassword = () =>{
	const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));  
    const [formData, setFormData] = useState({
    	name:"", 
    	email:"", 
    	mobile:"", 
    	newPassword:"", 
    	confirmPassword:"", 
    }); 
    const handleChange = (e) =>{
    	e.preventDefault(); 
    	setFormData({...formData, [e.target.name]:e.target.value}); 
    }; 
    const handleSubmit = (e) =>{
    	e.preventDefault(); 
    	dispatch(Actions.forgotPassword(formData, history)); 
    }
    return (
        <div className="h-screen w-full ">
            <div
                className={`bg-green-300 m-auto h-auto w-96 mt-5 mb-5 flex flex-col p-5`}
            >
                <div className="">
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
                            className="p-2 w-11/12 mt-10 mb-1"
                            placeholder="New Password"
                            value={formData.newPassword}
                            name="newPassword"
                            type="password"
                            onChange={handleChange}
                            autoComplete="off"
                        ></input>
                        <input
                            className="p-2 w-11/12 mt-3 mb-5"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                            autoComplete="off"
                        ></input>

                    </div>
                </div>

                
                

                <button onClick={handleSubmit} className="w-full bg-green-800 p-3 text-2xl text-bold rounded-full">Submit</button>
                
            </div>
        </div>
    )
}; 
export default ForgotPassword;

	