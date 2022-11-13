import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserRouter, Switch, Route, Router, Link } from "react-router-dom";

// components import
import Navigation from "./components/Navigation/Navigation.jsx";
import Home from "./components/Home/Home.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Settings from "./components/Settings/Settings.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";

import background from "./assets/background.jpeg";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div
      className="w-full h-screen relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        height: "auto",
        paddingBottom: "10px",
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/auth" component={Auth}></Route>
          <Route exact path="/settings" component={Settings}></Route>
          <Route
            exact
            path="/forgot_password"
            component={ForgotPassword}
          ></Route>
          {/* <Route exact path = "/user/me" component={Profile}></Route> */}
          {/* <Route exact path = "/user/:id" component={User}></Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
