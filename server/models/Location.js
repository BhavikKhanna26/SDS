import mongoose from "mongoose"; 
const LocationSchema = mongoose.Schema({
	title:{
		type:String, 
		required:true, 
	}, 
	pic:{
		type:String, 
		required:true, 
	}, 
	
}); 
export default mongoose.model("Location", LocationSchema); 
	