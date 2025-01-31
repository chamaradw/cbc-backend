import Review from "../models/Review.js";

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const review = new Review({ productId, userName, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

// Get all reviews for a product
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
