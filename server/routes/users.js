import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Delivery from "../models/Delivery.js";
import Location from "../models/Location.js";
import Rating from "../models/Rating.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// get all users
router.get("/all", async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});
// sign in
router.post("/signin", async (req, res) => {
	try {
		const { name, email, mobile, password } = req.body;
		console.log(req.body);

		const user = await User.findOne({ name: name });
		if (!user) {
			console.log("No user found");

			return res.status(404).json({ message: "No such user" });
		}
		console.log(user);

		const checkPass = await bcrypt.compare(password, user.account.password);
		if (!checkPass) {
			console.log("PAssword incorrect");

			return res.status(404).json({ message: "Password incorrect" });
		}
		const token = jwt.sign({ name: name, id: user._id }, "test", {
			expiresIn: "24h",
		});
		// console.log(user);
		await user.populate(["deliveries", "ratings"]);
		await user.save();
		return res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});
// sign up
router.post("/signup", async (req, res) => {
	try {
		const {
			name,
			email,
			mobile,
			password,
			address,
			year,
			department,
			degree,
		} = req.body;
		const x = await User.findOne({ name: name });
		if (x) {
			return res.status(404).json({ msg: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		let location = await Location.findOne({ address: address });
		if (!location) {
			location = await Location.create({
				address: address,
				pic: [],
			});
			await location.save();
		}

		const user = await User.create({
			name: name,
			account: {
				email: email,
				mobile: mobile,
				password: hashedPassword,
			},
			location: location._id,
			educationDetails: {
				year: year,
				department: department,
				degree: degree,
			},
			credit: 0,
			deliveries: [],
			ratings: [],
		});
		await user.save();
		const token = jwt.sign(
			{
				name: name,
				id: user._id,
			},
			"test",
			{
				expiresIn: "24h",
			}
		);
		console.log(user);

		return res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// update profile
router.put("/profile", auth, async (req, res) => {
	try {
		const {
			name,
			email,
			mobile,
			pfp,
			oldPassword,
			newPassword,
			confirmPassword,
			year,
			department,
			degree,
		} = req.body;
		const user = await User.findOne({
			_id: req.userId,
		});
		console.log(user);

		if (!user) {
			return res.status(404).json({ msg: "No such user" });
		}
		if (newPassword) {
			const checkPass = await bcrypt.compare(
				oldPassword,
				user.account.password
			);
			if (checkPass && newPassword === confirmPassword) {
				const hashedPassword = await bcrypt.hash(newPassword, 10);
				user.account.password = hashedPassword;
				await user.save();
			}
		}
		user.account = {
			email: email || user.account.email,
			mobile: mobile || user.account.mobile,
			pfp: pfp || user.account.pfp,
			password: user.account.password,
		};
		user.educationDetails = {
			year: year || user.educationDetails.year,
			department: department || user.educationDetails.department,
			degree: degree || user.educationDetails.degree,
		};
		await user.save();

		console.log(user);

		const token = jwt.sign(
			{
				name: name,
				id: user._id,
			},
			"test",
			{
				expiresIn: "24h",
			}
		);
		return res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});
// forgot password
router.put("/forgot_password", async (req, res) => {
	try {
		const { name, email, mobile, newPassword, confirmPassword } = req.body;
		const user = await User.findOne({
			$or: [{ name: name }, { email: email }, { mobile: mobile }],
		});
		if (!user) {
			console.log("No user found");

			return res.status(404).json({ message: "No such user" });
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.account.password = hashedPassword;
		await user.save();
		return res.status(200).json({ message: "Password updated!" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

// update pfp
router.put("/pfp", auth, async (req, res) => {
	try {
		const { pfp } = req.body;
		const user = await User.findOne({ _id: req.userId });

		user.account.pfp = pfp;
		await user.save();
		await user.save();

		console.log(user);

		const token = jwt.sign(
			{
				name: name,
				id: user._id,
			},
			"test",
			{
				expiresIn: "24h",
			}
		);
		return res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
});

export default router;
