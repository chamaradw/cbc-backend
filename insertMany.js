import mongoose from 'mongoose';

// Your product data (JSON)
const products = 
[
  {
    "productId": "BC024",
    "productName": "Herbal Whitening Cream",
    "altNames": ["Whitening Cream"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/herbal-whitening-cream.jpg"],
    "price": 2300.00,
    "lastPrice": 2300.00,
    "stock": 25,
    "description": "A natural cream formulated with herbal extracts to lighten skin tone and reduce pigmentation."
  },
  {
    "productId": "BC025",
    "productName": "Aloe Vera Moisturizing Lotion",
    "altNames": ["Moisturizing Lotion"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/aloe-vera-moisturizing-lotion.jpg"],
    "price": 1500.00,
    "lastPrice": 1500.00,
    "stock": 40,
    "description": "A hydrating lotion enriched with aloe vera to soothe and moisturize dry skin."
  },
  {
    "productId": "BC026",
    "productName": "Herbal Hair Oil",
    "altNames": ["Hair Oil"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/herbal-hair-oil.jpg"],
    "price": 1800.00,
    "lastPrice": 1800.00,
    "stock": 30,
    "description": "A nourishing hair oil infused with herbal extracts to strengthen hair and promote growth."
  },
  {
    "productId": "BC027",
    "productName": "Neem Face Wash",
    "altNames": ["Face Wash"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/neem-face-wash.jpg"],
    "price": 1200.00,
    "lastPrice": 1200.00,
    "stock": 50,
    "description": "A purifying face wash with neem extracts to cleanse and prevent acne."
  },
  {
    "productId": "BC028",
    "productName": "Sandalwood Body Scrub",
    "altNames": ["Body Scrub"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/sandalwood-body-scrub.jpg"],
    "price": 2000.00,
    "lastPrice": 2000.00,
    "stock": 35,
    "description": "An exfoliating body scrub with sandalwood to remove dead skin cells and leave skin smooth."
  },
  {
    "productId": "BC029",
    "productName": "Herbal Shampoo",
    "altNames": ["Shampoo"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/herbal-shampoo.jpg"],
    "price": 1600.00,
    "lastPrice": 1600.00,
    "stock": 45,
    "description": "A gentle shampoo infused with herbal ingredients to cleanse and nourish hair."
  },
  {
    "productId": "BC030",
    "productName": "Coconut Hair Mask",
    "altNames": ["Hair Mask"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/coconut-hair-mask.jpg"],
    "price": 2200.00,
    "lastPrice": 2200.00,
    "stock": 25,
    "description": "A deep conditioning hair mask with coconut oil to repair and hydrate damaged hair."
  },
  {
    "productId": "BC031",
    "productName": "Herbal Face Pack",
    "altNames": ["Face Pack"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/herbal-face-pack.jpg"],
    "price": 1400.00,
    "lastPrice": 1400.00,
    "stock": 50,
    "description": "A revitalizing face pack with herbal extracts to rejuvenate and brighten skin."
  },
  {
    "productId": "BC032",
    "productName": "Turmeric Face Cream",
    "altNames": ["Face Cream"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/turmeric-face-cream.jpg"],
    "price": 1700.00,
    "lastPrice": 1700.00,
    "stock": 40,
    "description": "A nourishing face cream with turmeric to even skin tone and reduce blemishes."
  },
  {
    "productId": "BC033",
    "productName": "Herbal Body Lotion",
    "altNames": ["Body Lotion"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/herbal-body-lotion.jpg"],
    "price": 1900.00,
    "lastPrice": 1900.00,
    "stock": 35,
    "description": "A moisturizing body lotion enriched with herbal extracts to hydrate and soften skin."
  },
  {
    "productId": "BC034",
    "productName": "Coconut Lip Balm",
    "altNames": ["Lip Balm"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/coconut-lip-balm.jpg"],
    "price": 800.00,
    "lastPrice": 800.00,
    "stock": 50,
    "description": "A hydrating lip balm with coconut oil to moisturize and protect lips."
  },
  {
    "productId": "BC035",
    "productName": "Herbal Foot Cream",
    "altNames": ["Foot Cream"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/herbal-foot-cream.jpg"],
    "price": 1300.00,
    "lastPrice": 1300.00,
    "stock": 40,
    "description": "A soothing foot cream with herbal extracts to soften and heal cracked heels."
  },
  {
    "productId": "BC036",
    "productName": "Aloe Vera Gel",
    "altNames": ["Gel"],
    "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/aloe-vera-gel.jpg"],
    "price": 1000.00,
    "lastPrice": 1000.00,
    "stock": 50,
    "description": "A pure aloe vera gel to soothe and hydrate skin, suitable for all skin types."
  },
  ];
  

// Define the Mongoose Product schema
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  altNames: [{ type: String }],
  images: [{ type: String }],
  price: { type: Number, required: true },
  lastPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true }
});

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
