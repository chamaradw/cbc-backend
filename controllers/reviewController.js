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