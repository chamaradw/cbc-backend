import express from "express";
import {submitReview,getReviews,getAllReviews,toggleHideReview,deleteReview,} from "../controllers/reviewController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Public routes
router.post("/", submitReview);
router.get("/:productId", getReviews);

// Admin routes (protected)
router.get("/", authenticate, getAllReviews);
router.patch("/:id/toggleHide", authenticate, toggleHideReview);
router.delete("/:id", authenticate, deleteReview);

export default router;
