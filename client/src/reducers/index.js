import { combineReducers } from "redux";
import auth from "./auth.js"; 
import loading from "./loading.js"; 
import delivery from "./deliveries.js"; 


export default combineReducers({
	auth,loading, delivery
});