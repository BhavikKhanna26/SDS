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
		// await Delivery.deleteMany({});
		const deliveries = await Delivery.find({}).sort({ createdOn: -1 });

		return res.status(200).json(deliveries);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});
router.delete("/all", async (req, res) => {
	const deliveries = await Delivery.find({});
	console.log(deliveries);

	const user = await User.findById({ _id: deliveries[0].for.rId });
	user.deliveries = [];
	await user.save();
	await Delivery.deleteMany({});
	return res.status(200).json({ user });
});

router.get("/count", async (req, res) => {
	try {
		const { n } = req.body;
		const deliveries = await Delivery.find({}).skip(n).limit(10);
		return res.status(200).json(deliveries);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

router.post("/filter", async (req, res) => {
	try {
		const { priceLow, priceHigh, minutesBefore } = req.body;
		const m = minutesBefore ? Number(minutesBefore.trim()) : 0;
		// console.log(req.body

		const date = new Date(new Date().getTime() - m * 60 * 1000);
		console.log(date);

		const deliveries = await Delivery.find({
			price: {
				$gte: priceLow ? Number(priceLow.trim()) : 0,
				$lte: priceHigh ? Number(priceHigh.trim()) : 0,
			},
		}).sort({ createdOn: -1 });
		// console.log(deliveries);

		return res.status(200).json(deliveries);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// create dlivery

router.post("/one", auth, async (req, res) => {
	try {
		const { itemTitle, description, price, time, img } = req.body;
		const user = await User.findOne({ _id: req.userId });
		if (!user) {
			return res.status(404).json({ msg: "No user" });
		}
		// console.log(user) ;
		//
		const delivery = await Delivery.create({
			for: {
				rId: user._id,
				name: user.name,
				pfp: user.account.pfp,
			},
			item: {
				itemTitle: itemTitle,
				description: description,
				img: img,
			},
			price: Number(price.trim()),
			time: Number(time.trim()),
		});
		await delivery.save();
		user.deliveries.push(delivery._id);

		await user.save();
		await user.populate(["deliveries", "ratings"]);
		const token = jwt.sign({ name: user.name, id: user._id }, "test", {
			expiresIn: "24h",
		});
		return res.status(200).json({
			authData: { user: user, token: token },
			delivery: delivery,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// update delivery
router.put("/one/:id", auth, async (req, res) => {
	try {
		const { price } = req.body;
		const delivery = await Delivery.findOne({ _id: req.params.id });
		const user = await User.findOne({ _id: req.userId });
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

		const forUser = await User.findOne({ _id: delivery.for.rId });
		const rUser = await User.findOne({ _id: delivery.deliverer.dId });

		await updatedDelivery.save();
		user;
		return res.status(200).json({ delivery: updatedDelivery });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

router.put("/delivery/:productId/:userId", auth, async (req, res) => {
	try {
		const { productId, userId } = req.body;
		const delivery = await Delivery.findOne({ _id: productId });
		const user = await Delivery;
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

router.put("/take/:productId", auth, async (req, res) => {
	try {
		const delivery = await Delivery.findById({ _id: req.params.productId });
		const u1 = await User.findById({ _id: req.userId });
		const u2 = await User.findById({ _id: delivery.for.rId });
		delivery.deliverer = {
			dId: u1._id,
			name: u1.name,
			pfp: u1.account.name,
		};
		delivery.status = "En route";
		await delivery.save();
		u2.deliveries.map((item) => {
			if (item._id === delivery._id) {
				item.deliverer = delivery.deliverer;
			}
		});
		await u2.save();
		u1.deliveries.push(delivery._id);
		u1.populate(["deliveries", "ratings"]);
		await u1.save();
		return res.status(200).json({ delivery: delivery, user: u1 });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});
// add delivery
router.get("/one/:id", async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(req.params) ;

		const delivery = await Delivery.findOne({ _id: id });
		return res.status(200).json(delivery);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

export default router;
