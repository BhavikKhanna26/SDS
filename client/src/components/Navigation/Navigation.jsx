import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router, Link } from "react-router-dom";
import decode from 'jwt-decode';

import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from '@material-ui/icons/Settings';
import FaceIcon from '@material-ui/icons/Face';


import * as Actions from "../../actions.js";

const Navigation = () =>{
	const dispatch = useDispatch();
    const location = useLocation();
    // const navigate =useNavigate(); 
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));  
    const logout = () => {
        dispatch({ type: "logOut" });
        setCurrentUser(null);
        window.location.reload();
    };
    useEffect(() => {
        const token = currentUser?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                return;
            }
        }

        setCurrentUser(JSON.parse(localStorage.getItem("user")));
        // return;
    }, [location]);


    const Profile = () => {
        // console.log(currentUser);
        const [droppedDown, setDroppedDown] = useState(false);
        if(!currentUser){
            return null; 
        }
        return (
            <div className="flex flex-row w-56 p-1 h-full mb-5 ml-auto mr-5 hover:border-0 hover:border-white">
                <div className="overflow-hidden">
                    <img
                        className="object-contain h-full"
                        src="https://preview.redd.it/coupmnvtixh61.png?auto=webp&s=d243ec2e22c435f455f06d8672f297cea98529f5"
                    />
                </div>
                <div className="flex flex-col  ml-3 text-sm text-white font-medium mt-auto mb-auto">
                    <p className="text-white">{currentUser.user.name}</p>
                    <p>{currentUser.user.credit} coins</p>
                </div>
                <div className="ml-auto mt-auto mb-auto relative inline-block">
                    <button
                        className="text-white"
                        onClick={() => setDroppedDown(!droppedDown)}
                    >
                        {!droppedDown ? (
                            <KeyboardArrowDownIcon />
                        ) : (
                            <KeyboardArrowUpIcon />
                        )}
                    </button>
                    <div
                        className={`absolute ${
                            droppedDown ? "flex" : "hidden"
                        } h-auto bg-zinc-800 w-64 top-10 right-0 flex-col p-4 mt-1 text-white space-y-5`}
                    >
                         <Link to="/user/me">
                            <div className="flex flex-row">
                                <div className="flex flex-col  w-10">
                                    <AccountCircleIcon />
                                </div>
                                <div className="flex flex-col ">
                                    <p>Profile</p>
                                </div>
                                </div>
                            </Link>
                        <Link to="/settings">
                            <div className="flex flex-row">
                                <div className="flex flex-col  w-10">
                                    <SettingsIcon />
                                </div>
                                <div className="flex flex-col ">
                                    <p>User Settings</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/avatar">
                            <div className="flex flex-row">
                                <div className="flex flex-col  w-10">
                                    <FaceIcon />
                                </div>
                                <div className="flex flex-col ">
                                    <p>Style Avatar</p>
                                </div>
                            </div>
                        </Link>

                        <hr />
                        <div className="flex flex-row">
                            <div className="flex flex-col  w-10">
                                {/* <AccountCircleIcon /> */}
                            </div>
                            <div className="flex flex-col ">
                                <p>Dark Mode</p>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col  w-10">
                                <ExitToAppIcon />
                            </div>
                            <div
                                className="flex flex-col "
                                onClick={() => logout()}
                            >
                                <p>Log out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
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

	