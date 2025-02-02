import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId : {type : String,required : true,unique : true},
    productName: { type: String, required: true, trim: true }, // Product name
    altNames : [{type : String}],
    brand: { type: String, required: true, trim: true }, // Brand Name
    category: { type: String, required: true, trim: true }, // Skincare, Makeup, etc.
    description: { type: String, required: true }, // Detailed description
    price: { type: Number, required: true, min: 0 }, // Price of the product
    lastPrice : {type : Number,required : true},
    discount: { type: Number, default: 0 }, // Discount percentage (if any)
    stock: { type: Number, required: true, min: 0 }, // Inventory stock count
    ratings: { type: Number, default: 0, min: 0, max: 5 }, // Avg. Rating (1-5)
    totalReviews: { type: Number, default: 0 }, // Number of reviews
    images: [{ type: String, required: true }], // Array of image URLs
    ingredients: [{ type: String }], // List of ingredients
    skinType: { type: [String] }, // Suitable for (e.g., Dry, Oily, Sensitive)
    shades: [{ name: String, colorCode: String }], // Variants like Lipstick shades
    expiryDate: { type: Date }, // Expiration date (if applicable)
    isFeatured: { type: Boolean, default: false }, // Featured product?
    isBestSeller: { type: Boolean, default: false }, // Bestseller product?
    tags: [{ type: String }], // Search tags for filtering
    createdAt: { type: Date, default: Date.now }, // Timestamp of creation
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);


//oldMOdel for references only
// import mongoose from "mongoose";

// const productSchema = mongoose.Schema({
//   productId : {type : String,required : true,unique : true},
//   productName : {type : String,required : true},
//   altNames : [{type : String}],
//   images : [{type : String}],
//   price : {type : Number,required : true},
//   lastPrice : {type : Number,required : true},
//   stock : {type : Number,required : true},
//   category: { type: String, default: "General" },
//   description : {type : String,required : true}
// })
// const Product = mongoose.model("products",productSchema);

// export default Product;