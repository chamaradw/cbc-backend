import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRoutes from './routes/orderRouter.js';
import reviewRoutes from './routes/reviewRoutes.js';
import wishlistRoutes from './routes/WishlistRoutes.js';
import logRouter from './routes/logRoutes.js';

dotenv.config();
const app = express();
const mongoUrl = process.env.MONGO_DB_URI;
const clientUrl = process.env.CLIENT_URL || "https://crystalbeautyclear.vercel.app"||"http://localhost:5173"; 

// ✅ MongoDB connection with proper error handling
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit process if connection fails
  }
};

connectToDB();


app.use(
  cors({
    origin: clientUrl, 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(); 
  }
  
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: '❌ Authentication failed' });
    }
    req.user = decoded;
    next();
  });
});


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/loginlogs', logRouter);  



app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
