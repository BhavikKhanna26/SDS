import axios from "axios";
const URL = "http://localhost:8000";
axios.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req;
});

// user links
export const signIn = (formData) => {
    return axios
        .post(URL + "/users/signin", formData)
        .catch((error) => console.log(error));
};

export const signUp = (formData) => {
    return axios
        .post(URL + "/users/signup", formData)
        .catch((error) => console.log(error));
};
