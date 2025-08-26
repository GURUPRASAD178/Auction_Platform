// routes/bidRoutes.js
import express from "express";

const router = express.Router();

// Create a bid
router.post("/", (req, res) => {
    res.json({ message: "Bid placed successfully" });
});

// List all bids (later filter by auctionId)
router.get("/", (req, res) => {
    res.json({ message: "List of bids" });
});

export default router;
