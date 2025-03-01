import mongoose from "mongoose";
import Review from "../models/Review.js";

// Add a new review (public)
export const submitReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newReview = new Review({ productId, userName, rating, comment });
    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get reviews for a specific product (public)
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const reviews = await Review.find({ productId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all reviews (admin-only)
export const getAllReviews = async (req, res) => {
  try {
    if (!req.user || req.user.type !== "admin") {
      console.error("❌ Access Denied: User is not an admin.");
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const reviews = await Review.find({});
    res.status(200).json(reviews);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Toggle hide/unhide a review (admin-only)
export const toggleHideReview = async (req, res) => {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;  // Use _id instead of productId
    const review = await Review.findById(id); 

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.isHidden = !review.isHidden;
    await review.save();

    res.status(200).json({ message: "Review visibility toggled", review });
  } catch (error) {
    console.error("Error toggling review visibility:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


// Delete a review (admin-only)
export const deleteReview = async (req, res) => {
  try {
    if (!req.user || req.user.type !== "admin") {
      console.error("Unauthorized delete attempt.");
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { productId } = req.params;
    // Find and delete review based on productId, not _id
    const review = await Review.findOneAndDelete({ productId });
    if (!review) {
      console.error(`Failed to delete. Review with productId ${productId} not found.`);
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully", review });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
