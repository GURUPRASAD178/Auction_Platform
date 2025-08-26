import express from "express";

const router = express.Router();

// Example routes
router.post("/register", (req, res) => {
    res.json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
    res.json({ message: "User logged in successfully" });
});

export default router;
