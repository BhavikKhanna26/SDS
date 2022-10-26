import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Delivery from "../models/Delivery.js";
import Location from "../models/Location.js";
import Rating from "../models/Rating.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// get all deliveries
router.get("/all", async (req, res) => {
	try {
		const deliveries = await Delivery.find({});
		return res.status(200).json({ deliveries });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// create dlivery

router.post("/one", auth, async (req, res) => {
	try {
		const { itemTitle, description, price, time } = req.body;
		const user = await User.findOne({ _id: req.userId });
		if(!user){
			return res.status(404).json({ msg: "No user"});
		}
		console.log(user) ;
		// 	
		const delivery = await Delivery.create({
			for: {
				rId:user._id, 
				name:user.name, 
			},
			item: {
				itemTitle: itemTitle,
				description: description,
			},
			price: Number(price.trim()),
			time:Number(time.trim()),
		});
		await delivery.save();
		user.deliveries.push(delivery._id);
		await user.save();
		// const token = jwt.sign({ name: name, id: user._id }, "test", {
		// 	expiresIn: "24h",
		// });
		// return res
		// 	.status(200)
		// 	.json({ user: user, token: token, delivery: delivery });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// update delivery
router.put("/one/:id", auth, async (req, res) => {
	try {
		const { price } = req.body;
		const delivery = await Delivery.findOne({ id: req.params.id });
		const user = await User.findOne({ id: req.userId });
		if (!delivery) {
			return res.status(404).json({ msg: "No delivery with that id" });
		}
		if (!user) {
			return res.status(404).json({ msg: "No such user" });
		}
		const updatedDelivery = await Delivery.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				price: price,
			}
		);
		await updatedDelivery.save();
		return res.status(200).json({ delivery: updatedDelivery });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// add delivery
router.get("/one/:id", async (req, res) => {
	try {
		const { id } = req.params.id;
		const delivery = await Delivery.findOne({ _id: id });
		return res.status(200).json({ delivery });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

export default router;
