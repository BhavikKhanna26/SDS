import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import decode from 'jwt-decode';

import * as Actions from "../../actions.js";

const Navigation = () =>{
	const dispatch = useDispatch();
    const location = useLocation();
    // const navigate =useNavigate(); 
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));  
    const Profile = ()=>{
        if(currentUser){
            return (
                <a href="/profile">
                    <div className="">
                        <h1>{currentUser.name}</h1>
                    </div>
                </a>
            )
        }
        else{
            return null; 
        }
    }
    return (
    	<div className="w-full bg-black h-16 flex flex-row justify-between text-white pl-10 pr-10">
    		<div className="mt-auto mb-auto">
    			<a href="/">Delivery</a>
    		</div>
    		<div className={`mt-auto mb-auto ${currentUser && "hidden"}`}>
    			<a href="/auth">
    				<button className="bg-white text-black p-2 rounded-full w-20 font-bold">
    					Log In
    				</button>	
    			</a>
    			
    		</div>
            <Profile />
    	</div>
    )
}; 
export default Navigation;

	