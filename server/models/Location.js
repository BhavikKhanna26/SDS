import mongoose from "mongoose"; 
const LocationSchema = mongoose.Schema({
	address:{
		type:String, 
		required:true, 
	}, 
	pics:[String], 
	
}); 
export default mongoose.model("Location", LocationSchema); 
	