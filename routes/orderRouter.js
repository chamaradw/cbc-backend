import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Route to create a new order
router.post("/", createOrder);

// Route to fetch all orders
router.get("/", getAllOrders);

// Route to fetch a specific order by ID
router.get("/:id", getOrderById);

// Route to update order status
router.put("/:id", updateOrderStatus);

// Route to delete an order by ID
router.delete("/:id", deleteOrder);

export default router;




