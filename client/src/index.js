import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
// import reportWebVitals from './reportWebVitals';
ReactDOM.render(
	<Provider store={store}>
		<App></App>
	</Provider>,
	document.getElementById("root")
);

export default store