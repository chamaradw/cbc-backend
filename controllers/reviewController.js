import mongoose from "mongoose";  // ✅ Add this line
import Review from "../models/Review.js";

// Add a new review
export const submitReview = async (req, res) => {
  try {
    console.log(req.body);
    const { productId, userName, rating, comment } = req.body;

    // No need for ObjectId validation since productId is a string
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new review object
    const newReview = new Review({
      productId, // productId is already a string, no need to convert
      userName,
      rating,
      comment,
    });

    // Save the new review to the database
    await newReview.save();

    // Return a success response
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

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Fetch reviews for the given productId (as a string)
    const reviews = await Review.find({ productId });

    // Return reviews
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};