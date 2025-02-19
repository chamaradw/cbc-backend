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

// MongoDB connection with async/await
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connection to MongoDB is successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  }
};

connectToDB();

// Middleware for parsing JSON
app.use(express.json());

// CORS middleware with configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Specify your client URL
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);

// JWT authentication middleware
app.use((req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    req.user = decoded;
    next();
  });
});

// Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/logs', logRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
