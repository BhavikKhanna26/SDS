import mongoose from "mongoose"; 
const DeliverySchema = mongoose.Schema({
	for:{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"User", 
		required:true, 
	}, 
	deliverer:{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"User", 
		required:true, 
	}, 
	item:{
		itemType:{
			type:String, 
			required:true, 
		}, 
		description:{
			type:String, 
			required:true, 
		}, 
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
	