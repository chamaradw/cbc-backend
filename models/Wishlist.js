import mongoose from "mongoose";


const wishlistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  products: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);
