import express from "express";
import { submitReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", submitReview); // Add a review
router.get("/:productId", getReviews); // Get reviews for a product

export default router;
