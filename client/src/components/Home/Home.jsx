import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
    BrowserRouter,
    Switch,
    Route,
    Router,
    Redirect,
    Link,
} from "react-router-dom";
import decode from "jwt-decode";

import * as Actions from "../../actions.js";
import "./Home.css";
import formBackground from "../../assets/background2.jpeg";
import noImage from "../../assets/no-image.jpg";

import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import FaceIcon from "@material-ui/icons/Face";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location)
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    // console.log(currentUser);

    const { isLoading } = useSelector((state) => state.loading);
    const { deliveries } = useSelector((state) => state.delivery);
    useEffect(() => {
        const token = currentUser?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(Actions.logOut());
            }
            setCurrentUser(JSON.parse(localStorage.getItem("user")));
        } else {
            <Redirect to="/auth" />;
        }
    }, [location]);

    useEffect(() => {
        dispatch(Actions.startLoad());
        dispatch(Actions.getAllDeliveries());
        setTimeout(() => dispatch(Actions.endLoad()), 1000);
    }, [location]);
    // console.log(deliveries) ;

    const Delivery = ({ delivery }) => {
        const [hidden, setHidden] = useState(false);
        return (
            <div className="w-full h-48 bg-blue-400 flex flex-row p-5">
                <img src={delivery.item.img || noImage}></img>
                <div className="flex flex-col">
                    <p>{delivery.item.itemTitle}</p>
                    <p>{delivery.item.description}</p>
                    <p>{delivery.createdOn}</p>
                    <p>{delivery.price}</p>
                    <a href={`/delivery/${delivery._id}`}>See this ....</a>
                </div>
            </div>
        );
    };
    const Create = () => {
        const [showModal, setShowModal] = useState(false);

        const [formData, setFormData] = useState({
            itemTitle: "",
            description: "",
            price: "",
            img: "",
            time: "",
        });
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);

            dispatch(Actions.createDelivery(formData, history));
        };

        return (
            <div className="ml-auto">
                <button
                    className={
                        "w-56 rounded-full h-12 mt-1 text-white border-2 border-white mr-5 hover:bg-stone-800 font-bold"
                    }
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Add delivery Item
                </button>

                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-transparent">
                            <div
                                className="relative w-screen my-6 mx-auto max-w-3xl h-full"
                                style={{
                                    backgroundImage: `url(${formBackground})`,
                                }}
                            >
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-5/6 bg-white outline-none focus:outline-none p-5 h-full float-right">
                                    <div className="flex flex-row">
                                        <h1>Add delivery Item</h1>
                                        <button
                                            className=""
                                            onClick={() =>
                                                setShowModal(!showModal)
                                            }
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="w-full h-64 bg-green-200">
                                            <input type="file"></input>
                                        </div>

                                        <label>Item Title</label>
                                        <input
                                            className="border-2 border-black p-2"
                                            onChange={handleChange}
                                            placeholder="Food, Accessories or...."
                                            name="itemTitle"
                                        ></input>
                                        <label>Description</label>
                                        <textarea
                                            className="border-2 border-black p-2"
                                            onChange={handleChange}
                                            placeholder="Describe your item...."
                                            name="description"
                                        ></textarea>
                                        <div className="flex flex-row">
                                            <div className="flex flex-col mr-10">
                                                <label>Time</label>
                                                <input
                                                    className="border-2 border-black p-2"
                                                    onChange={handleChange}
                                                    placeholder="Time required...."
                                                    name="time"
                                                ></input>
                                            </div>
                                            <div className="flex flex-col">
                                                <label>Price</label>
                                                <input
                                                    className="border-2 border-black p-2"
                                                    onChange={handleChange}
                                                    placeholder="Price you will offer...."
                                                    name="price"
                                                ></input>
                                            </div>
                                        </div>
                                        <button
                                            className="bg-red-200 mt-5 p-5 "
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        );
    };
    const Filter = () => {
        return <div></div>;
    };
    if (isLoading) {
        return <p>Loading</p>;
    }
    return (
        <div className="h-screen w-full mt-10">
            <div className="w-2/3 bg-white h-full mx-auto p-10">
                <p className="text-3xl text-center mb-5">Deliveries</p>
                <hr></hr>
                <div className="flex flex-row">
                    <Create />
                    <Filter />
                </div>
                {deliveries.length &&
                    deliveries.map((delivery) => (
                        <Delivery delivery={delivery} />
                    ))}
            </div>
        </div>
    );
};
export default Home;
