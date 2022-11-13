import mongoose from "mongoose"; 
const ratingSchema = mongoose.Schema({
	for: {
		rId: mongoose.Schema.Types.ObjectId,
		name: String,
	},
	to: {
		tId: mongoose.Schema.Types.ObjectId,
		name: String,
	},
	rating:{
		type:Number, 
		required:true, 
	}, 
	comment:{
		type:String, 
		required:true, 
	}, 
	createdOn: {
		type: Date,
		default: new Date(),
	},
}); 
export default mongoose.model("Rating", ratingSchema); 
	