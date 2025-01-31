import { Router } from "express";
const router = Router();
import Review from "../models/Review";

// Get reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews." });
  }
});

// Submit a new review
router.post("/", async (req, res) => {
  const { productId, rating, comment, userName } = req.body;
  try {
    const newReview = new Review({
      productId,
      rating,
      comment,
      userName,
    });
    await newReview.save();
    res.status(201).json(newReview);
    console.log(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error submitting review." });
  }
});

export default router;
