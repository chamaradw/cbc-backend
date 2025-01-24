import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRoutes from './routes/orderRouter.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import cors   from "cors";


// Your product data (JSON)
const products = [
  {
    "productId": "SLB001",
    "productName": "Ceylon Herbal Face Pack",
    "altNames": ["Ayurvedic Face Mask"],
    "images": ["https://example.com/images/face-pack-1.jpg"],
    "price": 1200,
    "lastPrice": 1500,
    "stock": 50,
    "description": "A natural face pack made with authentic Sri Lankan herbs for radiant skin."
  },
  {
    "productId": "SLB002",
    "productName": "Coconut Oil Hair Serum",
    "altNames": ["Organic Hair Oil"],
    "images": ["https://example.com/images/hair-serum-1.jpg"],
    "price": 850,
    "lastPrice": 1000,
    "stock": 100,
    "description": "Pure coconut oil-based hair serum for strong and shiny hair."
  },
  {
    "productId": "SLB003",
    "productName": "Kasturi Turmeric Cream",
    "altNames": ["Turmeric Brightening Cream"],
    "images": ["https://example.com/images/turmeric-cream.jpg"],
    "price": 950,
    "lastPrice": 1100,
    "stock": 75,
    "description": "A natural cream enriched with Sri Lankan Kasturi turmeric to brighten and nourish skin."
  },
  {
    "productId": "SLB004",
    "productName": "Sandalwood Face Mist",
    "altNames": ["Refreshing Mist"],
    "images": ["https://example.com/images/face-mist.jpg"],
    "price": 700,
    "lastPrice": 850,
    "stock": 60,
    "description": "A rejuvenating face mist made with sandalwood extracts from Sri Lanka."
  },
  {
    "productId": "SLB005",
    "productName": "Tea Tree Acne Gel",
    "altNames": ["Anti-Acne Gel"],
    "images": ["https://example.com/images/acne-gel.jpg"],
    "price": 1100,
    "lastPrice": 1300,
    "stock": 40,
    "description": "Tea tree oil-based gel for effective acne treatment."
  },
  {
    "productId": "SLB006",
    "productName": "Cinnamon Lip Balm",
    "altNames": ["Herbal Lip Balm"],
    "images": ["https://example.com/images/lip-balm.jpg"],
    "price": 450,
    "lastPrice": 550,
    "stock": 200,
    "description": "Natural lip balm made with Sri Lankan cinnamon for smooth lips."
  },
  {
    "productId": "SLB007",
    "productName": "Ceylon Neem Soap",
    "altNames": ["Herbal Neem Soap"],
    "images": ["https://example.com/images/neem-soap.jpg"],
    "price": 300,
    "lastPrice": 400,
    "stock": 150,
    "description": "Handmade soap with neem extracts for gentle cleansing."
  },
  {
    "productId": "SLB008",
    "productName": "Gotukola Face Serum",
    "altNames": ["Centella Asiatica Serum"],
    "images": ["https://example.com/images/face-serum.jpg"],
    "price": 1400,
    "lastPrice": 1700,
    "stock": 30,
    "description": "Anti-aging serum with Gotukola (Centella Asiatica) extracts."
  },
  {
    "productId": "SLB009",
    "productName": "Pandanus Hair Oil",
    "altNames": ["Rampa Hair Oil"],
    "images": ["https://example.com/images/hair-oil.jpg"],
    "price": 800,
    "lastPrice": 1000,
    "stock": 80,
    "description": "Nourishing hair oil made with Pandanus (Rampa) leaves."
  },
  {
    "productId": "SLB010",
    "productName": "Aloe Vera Gel",
    "altNames": ["Hydrating Gel"],
    "images": ["https://example.com/images/aloe-gel.jpg"],
    "price": 600,
    "lastPrice": 750,
    "stock": 120,
    "description": "Multi-purpose aloe vera gel for hydration and skin soothing."
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

const Product = mongoose.model('Product2', productSchema);


dotenv.config()

const app = express();
const mongoUrl = process.env.MONGO_DB_URI
mongoose.connect(mongoUrl,{})
const connection = mongoose.connection;
connection.once("open",()=>
{
  console.log("Connection to the mongoDB is successfully established. !");
})
app.use(bodyParser.json())
app.use(
  (req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","")
    console.log(token)
    if(token != null)
    {
      jwt.verify(token,process.env.SECRET , (error,decoded)=>
      {
        if(!error){req.user = decoded}
      })
    }
    next()
  }
)
app.use(cors())
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRoutes)
app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)