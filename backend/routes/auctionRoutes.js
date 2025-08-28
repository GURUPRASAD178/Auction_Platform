import express from "express";
import {
    createAuction,
    getAuctions,
    getAuctionById,
    updateAuction,
    deleteAuction,
} from "../controllers/auctionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAuctions);
router.get("/:id", getAuctionById);
router.post("/", protect, createAuction);
router.put("/:id", protect, updateAuction);
router.delete("/:id", protect, deleteAuction);

export default router;

router.post("/", async (req, res) => {
    try {
        console.log("Incoming auction data:", req.body); // 👈 Add this line

        const { title, description, startingPrice } = req.body;

        const auction = new Auction({
            title,
            description,
            startingPrice,
        });

        await auction.save();
        res.status(201).json(auction);
    } catch (error) {
        console.error("Error creating auction:", error.message); // 👈 log error
        res.status(500).json({ message: "Error creating auction", error });
    }
});
