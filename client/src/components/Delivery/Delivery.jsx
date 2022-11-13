import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router, Redirect, Link } from "react-router-dom";
import decode from 'jwt-decode';

import * as Actions from "../../actions.js";

const Delivery = () =>{
	const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));  
    const {id} = useParams(); 
    const {delivery} = useSelector((state) => state.delivery) ;
    // console.log(id) 

    useEffect(()=>{
        dispatch(Actions.startLoad()); 
        dispatch(Actions.getDeliveryById(id)); 
        dispatch(Actions.endLoad());
    }, [id])


    if(!currentUser){
    	return <Redirect to="/login"></Redirect>
    }; 
    	
    console.log(delivery) ; 
    	
    return (
    	<div className="h-screen">
    		<div className="h-1/2 bg-"> 
                
            </div>
    	</div>
    )
}; 
export default Delivery;

	