import express from 'express'; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Delivery from "../models/Delivery.js";
import Location from "../models/Location.js";
import Rating from "../models/Rating.js";


import auth from '../middleware/auth.js'

const router =  express.Router(); 

router.get("/all", async (req,res)=>{
	try{
		const users = await User.find({}); 
		return res.status(200).json({users});  
			
	} catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});			
	}
}); 
router.post("/signin", (req, res)=>{
	try{
		const {email, mobile, password} = req.body; 
		const user = await User.findOne({email:email}); 
		if(!user){
			return res.status(404).json({ msg: "No such user"});
		}
		const checkPass = await bcrypt.compare(password, user.profile.password); 
		if(!checkPass){
			return res.status(404).json({ msg: "Password incorrect"});
		}
		const token = jwt.sign({email:email, id:user._id}, "test", {expiresIn: "1h"}); 
		return res.status(200).json({user: user, token: token});
			
	}
	catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});
	}
})

router.post("/signup", (req, res)=>{
	try{
		const {name, email, mobile, password, address. year, department, degree} = req.body; 
		const x = await User.findOne({email:email}); 
		if(x){
			return res.status(404).json({ msg: "User already exists"});
		}
		const hashedPassword = await bcrypt.hash(password, 10); 
		let location = await Location.findOne({ address: address}); 
		if(!location){
			location = await Location.creaate({
				address:address, 
				pic:[], 
			}); 
			await location.save(); 
		}
		const user = await User.create({
			name:name, 
			account:{
				email:email, 
				mobile: mobile, 
				password: password, 
			}, 
			location:location._id, 
			educationDetails:{
				year:year, 
				department:department, 
				degree:degree, 
			}, 
			credit:0, 
			deliveries:[], 
			ratings:[], 
		}); 
		await user.save(); 
		const token = jwt.sign({
			name:name, 
			id:user._id, 

		}, "test", {
			expiresIn:"24h"
		}); 
		return res.status(200).json({user:user, token:token}); 
			
		
	}
	catch(error){
		console.log(error); 
		return res.status(500).json({message:error.message});
	}
})
	
	

export default router; 