import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin, isCustomer } from "./userController.js";

export async function createOrder(req, res) {
  try {
    if (!isCustomer(req)) {
      return res.status(403).json({ message: "Please login as a customer to create orders" });
    }

    const latestOrder = await Order.find().sort({ date: -1 }).limit(1);
    let orderId = latestOrder.length === 0 ? "CBC1001" : `CBC${(parseInt(latestOrder[0].orderId.replace("CBC", "")) + 1).toString().padStart(4, "0")}`;

    const newOrderData = req.body;

    if (!newOrderData.orderedItems || newOrderData.orderedItems.length === 0) {
      return res.status(400).json({ message: "No ordered items provided" });
    }

    const newProductArray = [];
    for (const item of newOrderData.orderedItems) {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
      }

      newProductArray.push({
        productName: product.productName,
        altNames: product.altNames,
        quantity: item.qty,
        price: product.lastPrice,
        images: product.images[0],
        custName: newOrderData.custName,
        custAddress: newOrderData.custAddress,
        paymentId: newOrderData.paymentId,
        notes: newOrderData.notes,
        status: newOrderData.status,
      });
    }
    console.log(newProductArray);
    newOrderData.orderedItems = newProductArray;
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);
    const savedOrder = await order.save();

    res.json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export async function getOrders(req, res) {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized access!! Please login as a customer to view orders" });
    }

    if (isAdmin(req)) {
      const orders = await Order.find();
      return res.json(orders);
    }

    if (isCustomer(req)) {
      const orders = await Order.find({ email: req.user.email });
      return res.json(orders);
    }

    return res.status(400).json({ message: "Invalid user role" });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: error.message });
  }
}

export async function getQuote(req, res) {
  try {
    const newOrderData = req.body;
    const newProductArray = [];
    let total = 0;
    let labeledTotal = 0;

    for (const item of newOrderData.orderedItems) {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      labeledTotal += product.price * item.qty;
      total += product.lastPrice * item.qty;

      newProductArray.push({
        name: product.productName,
        price: product.lastPrice,//last price is the current price of the product
        labeledPrice: product.price,
        quantity: item.qty,
        image: product.images[0],
      });
    }

    return res.json({ orderedItems: newProductArray, total, labeledTotal });
  } catch (error) {
    console.error("Error in getQuote:", error);
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteOrder(req, res) {
  try {
    const { orderId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please login to delete orders." });
    }

    console.log("User attempting to delete order:", req.user);

    if (!orderId) {
      return res.status(400).json({ message: "Bad Request: Order ID is required." });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log(`Order found for deletion - ID: ${orderId}, Email: ${order.email}`);

    // Authorization check: Only the owner or an admin can delete
    if (order.email !== req.user.email && !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to delete this order." });
    }

    const deletedOrder = await Order.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(500).json({ message: "Failed to delete order." });
    }

    res.json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateOrder(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "Please login as admin to update orders",
    });
  }
  
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({
      orderId: orderId,
    });

    if (order == null) {
      res.status(404).json({
        message: "Order not found",
      })
      return;
    }

    const notes = req.body.notes;
    const status = req.body.status;

    const updateOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { notes: notes, status: status }
    );

    res.json({
      message: "Order updated",
      updateOrder: updateOrder
    });

  }catch(error){

    
    res.status(500).json({
      message: error.message,
    });
  }
}