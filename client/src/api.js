import axios from "axios";
const URL = "http://localhost:8000";
axios.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
        }`;
    }

    return req;
});

// user links
export const signIn = (formData) => {
    // console.log(formData) ;

    return axios
        .post(URL + "/users/signin", formData)
        .catch((error) => console.log(error));
};

export const signUp = (formData) => {
    return axios
        .post(URL + "/users/signup", formData)
        .catch((error) => console.log(error));
};
export const updateProfile = (formData) => {
    return axios
        .put(URL + "/users/profile", formData)
        .catch((error) => console.log(error));
};
export const forgotPassword = (formData) => {
    // console.log(formData) ;

    return axios
        .put(URL + "/users/forgot_password", formData)
        .catch((error) => console.log(error));
};

// delivery links
export const getAllDeliveries = () => {
    // console.log(formData) ;

    return axios
        .get(URL + "/deliveries/all")
        .catch((error) => console.log(error));
};

export const filterDeliveries = (formData) => {
    // console.log(formData) ;

    return axios
        .post(URL + "/deliveries/filter", formData)
        .catch((error) => console.log(error));
};

export const getDeliveryById = (id) => {
    // console.log(formData) ;

    return axios
        .get(URL + `/deliveries/one/${id}`)
        .catch((error) => console.log(error));
};

export const createDelivery = (formData) => {
    // console.log(formData) ;

    return axios
        .post(URL + "/deliveries/one", formData)
        .catch((error) => console.log(error));
};
