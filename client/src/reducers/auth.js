const authReducer=  (state={authData:null}, action) =>{
	switch(action.type){
		case "signIn":
			localStorage.setItem("user", JSON.stringify({...action?.payload})); 
			return {...state, authData:action?.payload}; 
		case "signUp":
			localStorage.setItem("user", JSON.stringify({...action?.payload})); 
			return {...state, authData:action?.payload}; 
		case "logOut":
			localStorage.clear();
			return {...state, authData:null}; 
		case "updateProfile":
			localStorage.setItem("user", JSON.stringify({...action?.payload})); 
			return {...state, authData:action?.payload}; 
		case "get_user":
			return {...state, user:action?.payload}; 
		case "set_url":
			return {...state, url:action?.payload}; 
		default:
			return state; 
	}; 
}; 


export default authReducer; 