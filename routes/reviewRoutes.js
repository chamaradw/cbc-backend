import express from "express";
import {submitReview,getReviews,getAllReviews,toggleHideReview,deleteReview,} from "../controllers/reviewController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Public routes
router.post("/", submitReview);
router.get("/:productId", getReviews);

// Admin routes (protected)
router.get("/", authenticate, getAllReviews);
router.patch("/:productId/toggleHide", authenticate, toggleHideReview);
router.delete("/:productId", authenticate, deleteReview);

export default router;
