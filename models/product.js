import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Product name
  price: { type: Number, required: true, min: 0 },   // Price of the product
  description: { type: String, trim: true },         // Product description
  category: { type: String, trim: true },            // Category of the product (e.g., Electronics, Beauty)
  brand: { type: String, trim: true },               // Brand of the product
  stock: { type: Number, default: 0, min: 0 },       // Quantity available in stock
  ratings: { type: Number, default: 0, min: 0, max: 5 }, // Average rating out of 5
  reviews: { type: Number, default: 0 },             // Total number of reviews
  isFeatured: { type: Boolean, default: false },     // Flag for featured products
  createdAt: { type: Date, default: Date.now },      // Product creation date
  updatedAt: { type: Date },                         // Product last update date
  imageUrl: { type: String, trim: true },            // URL for product image
});

const Product = mongoose.model("products", productSchema);

export default Product;