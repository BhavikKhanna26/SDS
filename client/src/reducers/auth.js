const authReducer=  (state={authData:null}, action) =>{
	switch(action.type){
		case "signIn":
			localStorage.setItem("user", JSON.stringify({...action?.payload})); 
			return {...state, authData:action?.data}; 
		case "signUp":
			localStorage.setItem("user", JSON.stringify({...action?.data})); 
			return {...state, authData:action?.data}; 
		case "logOut":
			localStorage.clear();
			return {...state, authData:null}; 
		case "update_profile":
			localStorage.setItem("user", JSON.stringify({...action?.data})); 
			return {...state, authData:action?.data}; 
		case "get_user":
			return {...state, user:action?.payload}; 
		case "set_url":
			return {...state, url:action?.payload}; 
		default:
			return state; 
	}; 
}; 


export default authReducer; 