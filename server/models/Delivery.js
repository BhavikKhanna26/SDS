import mongoose from "mongoose";
const DeliverySchema = mongoose.Schema({
	for: {
		rId: mongoose.Schema.Types.ObjectId,
		name: String,
		pfp: String, 
	},
	deliverer: {
		dId: mongoose.Schema.Types.ObjectId,
		name: String,
		pfp:String, 
	},
	item: {
		itemTitle: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			default: "",
		},
	},
	location: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Location",
	},
	createdOn: {
		type: Date,
		default: new Date(),
	},
	time: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "Awaiting taker",
	},
	price: {
		type: Number,
		required: true,
	},
});
export default mongoose.model("Delivery", DeliverySchema);
