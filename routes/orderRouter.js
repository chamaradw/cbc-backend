import express from "express";
import { createOrder, getOrders, getQuote, deleteOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// Create a new order
orderRouter.post("/", createOrder);

// Get all orders
orderRouter.get("/", getOrders);

// Get a quote
orderRouter.post("/quote", getQuote);

// Delete an order by orderId
orderRouter.delete("/:orderId", deleteOrder);

export default orderRouter;
