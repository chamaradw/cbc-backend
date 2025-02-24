import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true, trim: true },
    altNames: [{ type: String }],
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    lastPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true, min: 0 },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    ingredients: [{ type: String }],
    skinType: { type: [String] },
    shades: [{ name: String, colorCode: String }],
    expiryDate: { type: Date },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// Your JSON array of products
const products = [
  {
    productId: "BC065",
    productName: "Soothing Facial Cleanser",
    altNames: ["Gentle Cleanser"],
    brand: "British Cosmetics",
    category: "Skincare",
    description: "A gentle facial cleanser that removes impurities and soothes sensitive skin.",
    price: 1600.0,
    lastPrice: 1600.0,
    discount: 0,
    stock: 45,
    ratings: 0,
    totalReviews: 0,
    images: ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/soothing-facial-cleanser.jpg"],
    ingredients: ["Aloe Vera", "Chamomile Extract"],
    skinType: ["Sensitive", "Normal"],
    shades: [],
    expiryDate: null,
    isFeatured: false,
    isBestSeller: false,
    tags: ["cleanser", "soothing"],
  },
  {
    productId: "BC066",
    productName: "Ultra Hydrating Moisturizer",
    altNames: ["Hydrating Cream"],
    brand: "British Cosmetics",
    category: "Skincare",
    description: "An ultra hydrating moisturizer that locks in moisture for all-day hydration.",
    price: 2100.0,
    lastPrice: 2100.0,
    discount: 0,
    stock: 50,
    ratings: 0,
    totalReviews: 0,
    images: ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/ultra-hydrating-moisturizer.jpg"],
    ingredients: ["Hyaluronic Acid", "Glycerin"],
    skinType: ["Dry", "Sensitive"],
    shades: [],
    expiryDate: null,
    isFeatured: true,
    isBestSeller: false,
    tags: ["moisturizer", "hydration"],
  },
  {
    productId: "BC067",
    productName: "Revitalizing Facial Serum",
    altNames: ["Vitamin Serum"],
    brand: "British Cosmetics",
    category: "Skincare",
    description: "A revitalizing serum enriched with vitamins to rejuvenate tired skin.",
    price: 2800.0,
    lastPrice: 2800.0,
    discount: 0,
    stock: 35,
    ratings: 0,
    totalReviews: 0,
    images: ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/revitalizing-facial-serum.jpg"],
    ingredients: ["Vitamin C", "Vitamin E"],
    skinType: ["All"],
    shades: [],
    expiryDate: null,
    isFeatured: true,
    isBestSeller: false,
    tags: ["serum", "revitalizing"],
  },
];

// **Connect to MongoDB**
mongoose
  .connect("mongodb+srv://db:801023@cluster0.1tsq9.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // **Step 1: Get product IDs of incoming data**
    const productIds = products.map((p) => p.productId);

    // **Step 2: Find already existing products**
    const existingProducts = await Product.find({ productId: { $in: productIds } }).select("productId");
    const existingProductIds = existingProducts.map((p) => p.productId);

    // **Step 3: Filter out already existing products**
    const newProducts = products.filter((p) => !existingProductIds.includes(p.productId));

    if (newProducts.length > 0) {
      // **Step 4: Insert only new products**
      const insertedDocs = await Product.insertMany(newProducts);
      console.log(`${insertedDocs.length} new products inserted successfully.`);
    } else {
      console.log("No new products to insert. All are already in the database.");
    }

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting products:", error);
    mongoose.connection.close();
  });
