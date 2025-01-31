import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview); // Add a review
router.get("/:productId", getReviews); // Get reviews for a product

export default router;
