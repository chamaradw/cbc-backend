import express from "express";
import LoginLog from "../models/loginLog.js";

const router = express.Router();

// Fetch all login logs
router.get("/login-logs", async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    console.error("Error fetching login logs:", error);
    res.status(500).json({ message: "Error fetching login logs" });
  }
});

export default router;
