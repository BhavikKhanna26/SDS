import mongoose from "mongoose"; 
const DeliverySchema = mongoose.Schema({
	for:{
		rId:mongoose.Schema.Types.ObjectId, 
		name:String, 
	}, 
	deliverer:{
		dId:mongoose.Schema.Types.ObjectId, 
		name:String, 
	}, 
	item:{
		itemTitle:{
			type:String, 
			required:true, 
		}, 
		description:{
			type:String, 
			required:true, 
		}, 
		img:{
			type:String, 
			default:"", 
		}, 
	}, 
	
	time:{
		type:Number, 
		required:true, 
	}, 
	status:{
		type:String, 
		required:true, 
		default:"Awaiting taker", 
	}, 
	price:{
		type:Number, 
		required:true, 
	}, 


}); 
export default mongoose.model("Delivery", DeliverySchema); 
	