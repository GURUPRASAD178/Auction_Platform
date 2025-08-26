import Auction from "../models/Auction.js";

// Create auction
export const createAuction = async (req, res) => {
    try {
        const { title, description, startingBid, endTime, imageUrl } = req.body;

        const auction = await Auction.create({
            title,
            description,
            imageUrl,
            startingBid,
            currentBid: startingBid,
            endTime,
            seller: req.user._id,
        });

        res.status(201).json(auction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all auctions
export const getAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find().populate("seller", "username email");
        res.json(auctions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single auction
export const getAuctionById = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id).populate("seller", "username email");
        if (!auction) return res.status(404).json({ message: "Auction not found" });
        res.json(auction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update auction
export const updateAuction = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) return res.status(404).json({ message: "Auction not found" });

        if (auction.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedAuction = await Auction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedAuction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete auction
export const deleteAuction = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) return res.status(404).json({ message: "Auction not found" });

        if (
            auction.seller.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await auction.deleteOne();
        res.json({ message: "Auction deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
