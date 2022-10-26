import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import decode from 'jwt-decode';
import icon from "../../assets/icon.png"; 


import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import * as Actions from "../../actions.js";

const Settings = () =>{
	const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));  
    const [index, setIndex] = useState(-1); 
    const [formData, setFormData] = useState({
    	email: currentUser?.user.account.email, 
    	mobile:currentUser?.user.account.mobile, 
    	oldPassword:"", 
    	newPassword:"", 
    	confirmPassword:"", 
    	pfp:"",  
        year:currentUser?.user.educationDetails.year, 
        department:currentUser?.user.educationDetails.department, 
        degree:currentUser?.user.educationDetails.degree, 
    }); 
    const handleChange = (e)=>{
        e.preventDefault(); 
        setFormData({...formData, [e.target.name]:e.target.value}); 
    }; 
    const handleSubmit = (e) =>{
        e.preventDefault(); 
        dispatch(Actions.updateProfile(formData, history)); 
    }
    return (
    	<div className="h-screen w-full p-20 ">

    		<div className="flex flex-row  bg-white h-auto w-2/3 mx-auto">

                <div className="flex flex-col w-2/3  p-10">
                    <div className=" flex flex-col text-black">
                        <div className="flex flex-row p-2 justify-between"
                            onClick={()=> setIndex(index===0 ? -1: 0)}
                        >
                            <p>Email</p>
                            {index ===0 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </div>
                        <div className={`p-2 ${index!==0 && "hidden"}`}>
                            <input
                                className="p-2 w-full border border-black border border-black"
                                onChange = {handleChange}
                                name="email"
                                value={formData.email}
                            >
                                
                            </input>
                        </div>
                    </div>
                    <div className=" flex flex-col text-black">
                        <div className="flex flex-row p-2 justify-between" onClick={()=> setIndex(index===1 ? -1: 1)}>
                            <p>Mobile</p>
                            {index ===1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </div>
                        <div className={`p-2 ${index!==1 && "hidden"}`}>
                            <input
                                className="p-2 w-full border border-black"
                                onChange = {handleChange}
                                name="mobile"
                                value={formData.mobile}
                            >
                                
                            </input>
                        </div>
                    </div>
                    <div className=" flex flex-col text-black">
                        <div className="flex flex-row p-2 justify-between" onClick={()=> setIndex(index===2 ? -1: 2)}>
                            <p>Password</p>
                            {index ===2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </div>
                        <div className={`p-2 ${index!==2 && "hidden"}`}>
                            <input
                                className="p-2 w-full border border-black mb-2"
                                onChange = {handleChange}
                                name="oldPassword"
                            >
                                
                            </input>
                            <input
                                className="p-2 w-full border border-black mb-2"
                                onChange = {handleChange}
                                name="newPassword"
                            >
                                
                            </input>
                            <input
                                className="p-2 w-full border border-black"
                                onChange = {handleChange}
                                name="confirmPassword"
                            >
                                
                            </input>
                        </div>
                    </div>
                    <div className=" flex flex-col text-black">
                        <div className="flex flex-row p-2 justify-between" onClick={()=> setIndex(index===3 ? -1: 3)}>
                            <p>Education</p>
                            {index ===3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </div>
                        <div className={`p-2 flex flex-col ${index!==3 && "hidden"}`}>
                            <div className="flex flex-row">
                                <input
                                    className="p-2 w-1/3 mr-2 border border-black"
                                    onChange={handleChange}
                                    name="year"
                                    value={formData.year}

                                >
                                    
                                </input>
                                <input
                                    className="p-2 w-full border border-black"
                                    onChange={handleChange}
                                    name="department"
                                    value={formData.department}
                                >
                                    
                                </input>
                            </div>
                            <input
                                className="p-2 w-full border border-black mt-2"
                                onChange={handleChange}
                                name="degree"
                                value={formData.degree}
                            >
                                
                            </input>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-2 bg-red-200 w-1/3">
                    <div className="h-24 object-cover bg-blue-200 ">
                        <img src={`${icon}`} className="object-cover h-full mx-auto"/>
                    </div>
                    <input 
                        type="file"
                    ></input>
                    <button
                        onClick={handleSubmit}
                        className="w-full p-3 bg-red-400"
                    >
                        Submit
                    </button>
                </div>
            </div>
    	</div>
    )
}; 
export default Settings;

	