import mongoose from "mongoose";  // ✅ Add this line
import Review from "../models/Review.js";

// Add a new review
export const submitReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const newReview = new Review({
      productId: new mongoose.Types.ObjectId(productId), // Convert to ObjectId
      userName,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully", review: newReview });

  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all reviews for a product
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const reviews = await Review.find({ productId: new mongoose.Types.ObjectId(productId) });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
