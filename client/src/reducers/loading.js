const reducer = (state={isLoading:true} ,action) =>{
	if(action.type==='startLoad'){
		return {...state, isLoading:true}; 
	}
	else if(action.type==='endLoad'){
		return {...state, isLoading:false}; 
	}
	else{
		return state
	}
}

export default reducer; 