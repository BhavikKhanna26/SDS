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
    	<div></div>
    )
}; 
export default Home;

	