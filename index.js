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

// ✅ Allow multiple frontend URLs
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ["https://crystalbeautyclear.vercel.app", "http://localhost:5173"];

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
    origin: function (origin, callback) {
      const allowedOrigins = process.env.CLIENT_URL
        ? [process.env.CLIENT_URL]
        : ["https://crystalbeautyclear.vercel.app", "http://localhost:5173"];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // ✅ Allow if the origin is in the list or undefined (e.g., Postman)
      } else {
        console.error("❌ CORS Blocked:", origin);
        callback(new Error("CORS policy: Not allowed by server."));
      }
    },
    credentials: true, // ✅ Required for cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Ensure auth headers are allowed
  })
);


// ✅ Security Headers (Fixes COOP Issue)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ✅ Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ JWT Authentication Middleware
app.use((req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return next(); 

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: '❌ Authentication failed' });
    }
    req.user = decoded;
    next();
  });
});
app.options("*", cors());

// ✅ Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/loginlogs', logRouter);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
