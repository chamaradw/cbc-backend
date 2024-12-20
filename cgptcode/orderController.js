import Order from "../models/order.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!user || !items || items.length === 0 || !totalAmount || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    const savedOrder = await newOrder.save();
    res.json{message: "Order created successfully."}


    return res.status(201).json({ message: "Order created successfully.", order: savedOrder });
  } catch (error) {
    return res.status(500).json({ message: "Error creating order.", error: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.product");

    return res.status(200).json({ message: "Orders retrieved successfully.", orders });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders.", error: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user").populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json({ message: "Order retrieved successfully.", order });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching order.", error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus, paymentStatus, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json({ message: "Order updated successfully.", order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: "Error updating order.", error: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json({ message: "Order deleted successfully.", order: deletedOrder });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting order.", error: error.message });
  }
};
