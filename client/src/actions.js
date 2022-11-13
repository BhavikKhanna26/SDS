import * as api from "./api.js";
import store from "./index.js";

// base 64 conversion

export const convertToBase64 = (file) => {
	console.log(file);

	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			console.log(error);
		};
	});
};

// loading

// start loading
export const startLoad = () => async (dispatch) => {
	try {
		dispatch({ type: "startLoad" });
	} catch (error) {
		console.log(error);
	}
};

// end loading
export const endLoad = () => async (dispatch) => {
	try {
		dispatch({ type: "endLoad" });
	} catch (error) {
		console.log(error);
	}
};

// users

// sign in
export const signIn = (formData, history) => async (dispatch) => {
	try {
		// console.log(formData);
		const { data } = await api.signIn(formData);
		dispatch({ type: "signIn", payload: data });
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
// sign up
export const signUp = (formData, history) => async (dispatch) => {
	try {
		// console.log(formData)
		const { data } = await api.signUp(formData);
		// console.log(data);
		dispatch({ type: "signUp", payload: data });
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
// log out
export const logOut = () => async (dispatch) => {
	try {
		dispatch({ type: "logOut" });
	} catch (error) {
		console.log(error);
	}
};

// update profile
export const updateProfile = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.updateProfile(formData);
		// console.log(data) ;
		dispatch({ type: "updateProfile", payload: data });
		history.push("/settings");
	} catch (error) {
		console.log(error);
	}
};
// forgot password
export const forgotPassword = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.forgotPassword(formData);
		// console.log(data) ;
		// dispatch({type:"updateProfile", payload:data});
		history.push("/auth");
	} catch (error) {
		console.log(error);
	}
};

// deliveries

// get all

export const getAllDeliveries = () => async (dispatch) => {
	try {
		const { data } = await api.getAllDeliveries();
		// // console.log(data) ;
		dispatch({ type: "get_all_deliveries", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getDeliveryById = (id) => async (dispatch) => {
	try {
		const { data } = await api.getDeliveryById(id);
		// console.log(data) ;
		dispatch({ type: "get_one_delivery", payload: data });
		// history.push("/");
	} catch (error) {
		console.log(error);
	}
};

export const filterDeliveries = (formData) => async (dispatch) => {
	try {
		const { data } = await api.filterDeliveries(formData);
		console.log(data);
		dispatch({ type: "get_all_deliveries", payload: data });
		// history.push("/");
	} catch (error) {
		console.log(error);
	}
};

// create
export const createDelivery = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.createDelivery(formData);
		// console.log(data) ;
		dispatch({ type: "updateProfile", payload: data.authData });
		dispatch({ type: "create_delivery", payload: data.delivery });
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
