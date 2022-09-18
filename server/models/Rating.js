import mongoose from "mongoose"; 
const ratingSchema = mongoose.Schema({
	from:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User", 
		required:true, 
	}, 
	to:{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"User", 
		required:true, 
	}, 
	rating:{
		type:Number, 
		required:true, 
	}, 
	comment:{
		type:String, 
		required:true, 
	}
}); 
export default mongoose.model("Rating", ratingSchema); 
	