import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import decode from 'jwt-decode';

import * as Actions from "../../actions.js";
import "./Home.css"; 
const Home = () =>{
	const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));  
    console.log(currentUser); 
    	
    return (
    	<div className="h-screen w-full bg-red-200">
            <div className="w-2/3 bg-blue-200 h-full mx-auto">
                
            </div>
        </div>
    )
}; 
export default Home;

	