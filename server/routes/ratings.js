import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Delivery from "../models/Delivery.js";
import Location from "../models/Location.js";
import Rating from "../models/Rating.js";

import auth from "../middleware/auth.js";

const router = express.Router();


// get all
router.get("/all", async (req, res)=>{
	try{
		const ratings = await Rating.find({}); 
		return res.status(200).json(ratings);
			
	}
	catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});
	}
}); 


// get by count
router.get("/count", async (req, res)=>{
	try{
		const {n} = req.body;
		const ratings = await Rating.find({}).skip(n).limit(10); 
		return res.status(200).json(ratings); 
			
	}
	catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});
	}
}); 
	
// create one
router.post("/one", auth, async (req, res)=>{
	try{
		const {int, comment} = req.body; 
		const user = await User.findById(req.userId); 
		const rating = await Rating.create({
			for:{
				rId: req.userId, 
				name: user.account.name, 
			}, 
			rating: int, 
			comment: comment, 
		}); 
		user.ratings.push(rating._id); 
		user.populate(["ratings"]); 
		const token = jwt.sign({ name: user.name, id: user._id }, "test", {
			expiresIn: "24h",
		});
		return res
			.status(200)
			.json({
				authData: { user: user, token: token },
				rating: rating,
			});
	}
	catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});
	}
})
	
router.delete("/one/:id", auth, async (req, res)=>{
	try{
		const rating = await Rating.findOne({_id: req.params.id}); 
		if(!rating){
			return res.status(404).json({ msg: "No such item with id"});
		}
		await Rating.deleteOne({_id: rating._id});
		return res.status(200).json({msg:"Item deleted"});
			
	}
	catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});
	}
})
	
	
	

export default router; 