const reducer = (state={deliveries:[]} ,action) =>{
	if(action.type==='get_all_deliveries'){
		// console.log(action.payload)
		return {...state, deliveries:action.payload}
	}
	else if(action.type==='get_one_delivery'){
		return {...state, delivery:action.payload}
	}
	else if(action.type==='create_delivery'){
		return {...state, deliveries:[...state.deliveries, action.payload]}
	}
	else if(action.type==='update_delivery'){
		return {...state, deliveries:state.deliveries.map((item)=>{
			return item._id===action.payload._id?action.payload:item
		})}
	}
	else if(action.type==='delete_delivery'){
		return {...state, deliveries:state.deliveries.filter((item)=> item._id!==action.payload._id)}
	}
	else{
		return state
	}
}

export default reducer