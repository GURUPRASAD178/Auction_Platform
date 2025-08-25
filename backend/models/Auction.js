import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    startingBid: Number,
    currentBid: { type: Number, default: 0 },
    endTime: Date,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }]
}, { timestamps: true });

export default mongoose.model("Auction", auctionSchema);
