const CONNECTION_STRING =
	"mongodb+srv://ishraaq:ishraaq@cluster0.y7ts6ev.mongodb.net/?retryWrites=true&w=majority";
// package imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//route imports
import users from "./routes/users.js";
import deliveries from "./routes/delivery.js";
import ratings from "./routes/ratings.js";

//variable declartions
const PORT = process.env.port || 8000;
const MONGOOSE_USERNAME = "ishraaq";
const MONGOOSE_PASSWORD = "ishraaq";
const CONNECTION_URL = `mongodb+srv://ishraaq:ishraaq@cluster0.y7ts6ev.mongodb.net/?retryWrites=true&w=majority`;

// creating app
const app = express(); // initiaise the app
app.use(express.json()); // enable theapp to send json data
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.text({ limit: "50mb", extended: true }));
app.use(
	express.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 500000,
	})
);

app.use(cors({ origin: true, credentials: true })); //use cors

// connect mongoose
mongoose
	.connect(CONNECTION_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log("DB connectd, running on port", PORT);
		});
	})
	.catch((error) => {
		console.log(error);
	});

app.use("/users", users);
app.use("/deliveries", deliveries);
app.use("/ratings", ratings);
