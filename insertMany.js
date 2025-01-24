import mongoose from 'mongoose';

// Your product data (JSON)
const products = 
  [
    {
      "productId": "BC001",
      "productName": "Ceylon Green Tea Body Lotion",
      "altNames": ["Ceylon Tea Body Lotion"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/ceylon-green-tea-body-lotion.jpg"],
      "price": 2190.00,
      "lastPrice": 2190.00,
      "stock": 50,
      "description": "A luxurious body lotion infused with Ceylon green tea, known for its antioxidant properties, leaving your skin soft and rejuvenated."
    },
    {
      "productId": "BC002",
      "productName": "Coconut Milk Body Lotion",
      "altNames": ["Coconut Body Lotion"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/coconut-milk-body-lotion.jpg"],
      "price": 2190.00,
      "lastPrice": 2190.00,
      "stock": 50,
      "description": "Nourish your skin with this rich body lotion made from pure coconut milk, providing deep hydration and a tropical scent."
    },
    {
      "productId": "BC003",
      "productName": "Foot Repair Cream",
      "altNames": ["Foot Cream"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/foot-repair-cream.jpg"],
      "price": 880.00,
      "lastPrice": 880.00,
      "stock": 50,
      "description": "A soothing cream designed to repair and soften dry, cracked feet, leaving them smooth and comfortable."
    },
    {
      "productId": "BC004",
      "productName": "Fresh Relaxing Body Lotion for All Skin Types",
      "altNames": ["Relaxing Body Lotion"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/fresh-relaxing-body-lotion.jpg"],
      "price": 690.00,
      "lastPrice": 690.00,
      "stock": 50,
      "description": "A versatile body lotion suitable for all skin types, offering a fresh and relaxing fragrance while moisturizing the skin."
    },
    {
      "productId": "BC005",
      "productName": "Fresh Relaxing Body Wash for All Skin Types",
      "altNames": ["Relaxing Body Wash"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/fresh-relaxing-body-wash.jpg"],
      "price": 690.00,
      "lastPrice": 690.00,
      "stock": 50,
      "description": "Cleanse and refresh your skin with this gentle body wash, ideal for all skin types, leaving a relaxing scent."
    },
    {
      "productId": "BC006",
      "productName": "Brightening Gold Facial Serum",
      "altNames": ["Gold Facial Serum"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/brightening-gold-facial-serum.jpg"],
      "price": 3190.00,
      "lastPrice": 3190.00,
      "stock": 50,
      "description": "An advanced serum enriched with gold particles, designed to brighten and rejuvenate the skin, promoting a radiant complexion."
    },
    {
      "productId": "BC007",
      "productName": "Cell-Renew Gold Cleanser",
      "altNames": ["Gold Cleanser"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/cell-renew-gold-cleanser.jpg"],
      "price": 1240.00,
      "lastPrice": 1240.00,
      "stock": 50,
      "description": "A luxurious cleanser infused with gold, effectively removing impurities and promoting skin renewal for a fresh appearance."
    },
    {
      "productId": "BC008",
      "productName": "Illuminate Gold Eye Treatment Gel",
      "altNames": ["Gold Eye Gel"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/illuminate-gold-eye-treatment-gel.jpg"],
      "price": 3190.00,
      "lastPrice": 3190.00,
      "stock": 50,
      "description": "A revitalizing eye gel with gold extracts, targeting dark circles and puffiness, leaving the eye area refreshed and luminous."
    },
    {
      "productId": "BC009",
      "productName": "Pro-Repair Gold Night Moisturiser",
      "altNames": ["Gold Night Cream"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/pro-repair-gold-night-moisturiser.jpg"],
      "price": 3190.00,
      "lastPrice": 3190.00,
      "stock": 50,
      "description": "A rich night cream infused with gold, designed to repair and nourish the skin overnight, promoting a youthful glow."
    },
    {
      "productId": "BC010",
      "productName": "Regenerate Gold Facial Mask",
      "altNames": ["Gold Facial Mask"],
      "images": ["https://www.britishcosmetics.lk/wp-content/uploads/2023/01/regenerate-gold-facial-mask.jpg"],
      "price": 3190.00,
      "lastPrice": 3190.00,
      "stock": 50,
      "description": "A rejuvenating facial mask with gold particles, aimed at regenerating the skin and enhancing its natural radiance."
    }
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
