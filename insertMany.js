import mongoose from 'mongoose';


const products = 
[
  {
    "productId": "BC037",
    "productName": "Ceylon Jasmine Body Lotion",
    "altNames": ["Jasmine Lotion", "Sri Lankan Jasmine Lotion"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A luxurious body lotion infused with the essence of Ceylon Jasmine for a soft, smooth, and fragrant skin.",
    "price": 1200,
    "lastPrice": 1500,
    "discount": 20,
    "stock": 150,
    "ratings": 4.5,
    "totalReviews": 98,
    "images": ["https://britishcosmetics.lk/images/jasmine-lotion.jpg"],
    "ingredients": ["Jasmine Extract", "Coconut Oil", "Shea Butter"],
    "skinType": ["Dry", "Normal"],
    "shades": [],
    "expiryDate": "2026-06-15",
    "isFeatured": true,
    "isBestSeller": true,
    "tags": ["moisturizer", "jasmine", "body care"],
    "createdAt": "2025-02-01T10:00:00Z"
  },
  {
    "productId": "BC038",
    "productName": "Sri Lankan Turmeric Face Mask",
    "altNames": ["Turmeric Glow Mask", "Ceylon Turmeric Mask"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A face mask formulated with organic Ceylon turmeric to brighten, smoothen, and rejuvenate the skin.",
    "price": 800,
    "lastPrice": 1000,
    "discount": 20,
    "stock": 200,
    "ratings": 4.8,
    "totalReviews": 120,
    "images": ["https://britishcosmetics.lk/images/turmeric-mask.jpg"],
    "ingredients": ["Ceylon Turmeric", "Honey", "Aloe Vera"],
    "skinType": ["Oily", "Acne-Prone", "Normal"],
    "shades": [],
    "expiryDate": "2026-07-20",
    "isFeatured": true,
    "isBestSeller": true,
    "tags": ["face mask", "brightening", "turmeric"],
    "createdAt": "2025-02-01T10:10:00Z"
  },
  {
    "productId": "BC039",
    "productName": "Coconut & Lime Lip Balm",
    "altNames": ["Coconut Balm", "Lime Lip Care"],
    "brand": "British Cosmetics",
    "category": "Lip Care",
    "description": "A refreshing lip balm made with the natural goodness of coconut and lime to keep your lips hydrated and smooth.",
    "price": 300,
    "lastPrice": 400,
    "discount": 25,
    "stock": 350,
    "ratings": 4.7,
    "totalReviews": 60,
    "images": ["https://britishcosmetics.lk/images/coconut-lime-balm.jpg"],
    "ingredients": ["Coconut Oil", "Lime Extract", "Beeswax"],
    "skinType": ["All Skin Types"],
    "shades": [],
    "expiryDate": "2027-01-01",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["lip care", "hydrating", "coconut"],
    "createdAt": "2025-02-01T10:20:00Z"
  },
  {
    "productId": "BC040",
    "productName": "Ceylon Tea Green Shampoo",
    "altNames": ["Green Tea Shampoo", "Tea Shampoo"],
    "brand": "British Cosmetics",
    "category": "Hair Care",
    "description": "Revitalize your hair with the energizing Ceylon Tea Green Shampoo, designed to nourish and refresh.",
    "price": 950,
    "lastPrice": 1200,
    "discount": 21,
    "stock": 180,
    "ratings": 4.3,
    "totalReviews": 85,
    "images": ["https://britishcosmetics.lk/images/green-tea-shampoo.jpg"],
    "ingredients": ["Ceylon Green Tea", "Aloe Vera", "Ginseng"],
    "skinType": [],
    "shades": [],
    "expiryDate": "2026-08-10",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["shampoo", "hair care", "green tea"],
    "createdAt": "2025-02-01T10:30:00Z"
  },
  {
    "productId": "BC041",
    "productName": "Sandalwood Face Cream",
    "altNames": ["Sandalwood Moisturizer", "Ceylon Sandalwood Cream"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A soothing face cream enriched with the calming properties of Ceylon Sandalwood to hydrate and rejuvenate the skin.",
    "price": 1100,
    "lastPrice": 1300,
    "discount": 15,
    "stock": 120,
    "ratings": 4.6,
    "totalReviews": 95,
    "images": ["https://britishcosmetics.lk/images/sandalwood-cream.jpg"],
    "ingredients": ["Sandalwood", "Glycerin", "Vitamin E"],
    "skinType": ["Sensitive", "Dry"],
    "shades": [],
    "expiryDate": "2026-09-05",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["face cream", "sandalwood", "moisturizing"],
    "createdAt": "2025-02-01T10:40:00Z"
  },
  {
    "productId": "BC042",
    "productName": "Ceylon Cinnamon Body Scrub",
    "altNames": ["Cinnamon Scrub", "Sri Lankan Cinnamon Scrub"],
    "brand": "British Cosmetics",
    "category": "Body Care",
    "description": "A body scrub infused with natural Ceylon Cinnamon for exfoliation and skin rejuvenation.",
    "price": 1500,
    "lastPrice": 1800,
    "discount": 16,
    "stock": 90,
    "ratings": 4.7,
    "totalReviews": 70,
    "images": ["https://britishcosmetics.lk/images/cinnamon-scrub.jpg"],
    "ingredients": ["Ceylon Cinnamon", "Sugar", "Coconut Oil"],
    "skinType": ["Normal", "Oily"],
    "shades": [],
    "expiryDate": "2026-04-20",
    "isFeatured": false,
    "isBestSeller": true,
    "tags": ["scrub", "cinnamon", "exfoliating"],
    "createdAt": "2025-02-01T10:50:00Z"
  },
  {
    "productId": "BC043",
    "productName": "Coconut Milk Hand Cream",
    "altNames": ["Hand Moisturizer", "Coconut Hand Care"],
    "brand": "British Cosmetics",
    "category": "Hand Care",
    "description": "A nourishing hand cream made with coconut milk to keep hands soft and hydrated throughout the day.",
    "price": 600,
    "lastPrice": 700,
    "discount": 14,
    "stock": 300,
    "ratings": 4.9,
    "totalReviews": 55,
    "images": ["https://britishcosmetics.lk/images/coconut-milk-hand-cream.jpg"],
    "ingredients": ["Coconut Milk", "Aloe Vera", "Vitamin E"],
    "skinType": ["Dry", "Normal"],
    "shades": [],
    "expiryDate": "2026-12-15",
    "isFeatured": false,
    "isBestSeller": false,
    "tags": ["hand cream", "coconut", "hydrating"],
    "createdAt": "2025-02-01T11:00:00Z"
  },
  {
    "productId": "BC044",
    "productName": "Sri Lankan Rose Facial Toner",
    "altNames": ["Rose Toner", "Ceylon Rose Toner"],
    "brand": "British Cosmetics",
    "category": "Skincare",
    "description": "A refreshing facial toner made with Ceylon Rose water to hydrate and balance the skin's pH.",
    "price": 750,
    "lastPrice": 900,
    "discount": 17,
    "stock": 220,
    "ratings": 4.4,
    "totalReviews": 110,
    "images": ["https://britishcosmetics.lk/images/rose-toner.jpg"],
    "ingredients": ["Ceylon Rose Water", "Witch Hazel", "Glycerin"],
    "skinType": ["Oily", "Combination"],
    "shades": [],
    "expiryDate": "2026-05-10",
    "isFeatured": true,
    "isBestSeller": false,
    "tags": ["facial toner", "rose water", "hydrating"],
    "createdAt": "2025-02-01T11:10:00Z"
  }
]


// Define the Mongoose Product schema
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



const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://db:801023@cluster0.1tsq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    // Insert multiple documents at once
    Product.insertMany(products)
      .then((docs) => {
        console.log('Products inserted successfully:', docs);
        mongoose.connection.close(); // Close the connection
      })
      .catch((error) => {
        console.error('Error inserting products:', error);
        mongoose.connection.close(); // Close the connection in case of error
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
