import express from "express";
import mongoose from "mongoose";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Use the Order Routes
app.use("/api/orders", orderRoutes);

// Connect to Database and Start Server
mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
