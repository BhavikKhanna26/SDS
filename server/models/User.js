import mongoose from "mongoose"; 


const userSchema = mongoose.Schema({
	name:{
		type:String, 
		required:true
	},
	account:{
		email:{
			type:String, 
			required:true, 
		}, 
		mobile:{
			type:String, 
			required:true, 
		}, 
		pfp:{
			type:String, 
		}, 
		password:{
			type:String, 
			required:true, 
		}, 
	}, 
	location:{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"Location", 
	}, 
	educationDetails:{
		year:{
			type:Number, 
			required:true, 
		}, 
		department:{
			type:String, 
			required:true, 
		}, 
		degree:{
			type:String, 
			required:true, 
		}, 
	}, 
	credit: {
		type:Number, 
		default:0, 
	}, 
	deliveries:[{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"Delivery",
	}],
	ratings:[{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"Rating", 
	}] , 



}); 
export default mongoose.model("User", userSchema); 