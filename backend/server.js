import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected");
    server.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
});

// Socket.IO
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinAuction", (auctionId) => {
        socket.join(auctionId);
    });

    socket.on("placeBid", async ({ auctionId, userId, bidAmount }) => {
        // TODO: Update DB here
        io.to(auctionId).emit("newBid", { bidAmount, userId });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});
