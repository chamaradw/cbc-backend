import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { authenticate } from "../middleware/authenticate.js"; 

const router = express.Router();

// ✅ Dashboard statistics endpoint
router.get("/stats", authenticate, getDashboardStats);

export default router;
