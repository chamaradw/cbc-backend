import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
  try {
    // Check if the user is a customer (assuming isCustomer is a function)
    if (!isCustomer(req)) {
      return res.status(403).json({ message: "Please login as a customer to create orders" });
    }

    // Get the latest order and generate a new order ID
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1);
    let orderId;

    if (latestOrder.length === 0) {
      orderId = "CBC1001";
    } else {
      const currentOrderId = latestOrder[0].orderId;
      const number = parseInt(currentOrderId.replace("CBC", ""));
      orderId = "CBC" + (number + 1).toString().padStart(4, "0");
    }

    // Get the new order data
    const newOrderData = req.body;

    if (!newOrderData.orderedItems || newOrderData.orderedItems.length === 0) {
      return res.status(400).json({ message: "No ordered items provided" });
    }

    const newProductArray = [];
    let missingProducts = [];

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const productId = newOrderData.orderedItems[i].productId;
      const product = await Product.findOne({ productId: productId });

      if (!product) {
        missingProducts.push(productId);
      }

      if (!product) {
        return res.status(400).json({
          message: `Product with ID ${productId} not found`
        });
      }

      // Add product details to the new product array
      newProductArray[i] = {
        productName: product.productName,
        altNames: product.altNames,
        quantity: newOrderData.orderedItems[i].qty,
        price: product.lastPrice,
        images: product.images[0],
        custName: newOrderData.custName,
        custAddress: newOrderData.custAddress,
        paymentId: newOrderData.paymentId,
        notes: newOrderData.notes,
        status: newOrderData.status,
      };
    }

    // If there are missing products, return early with the missing product IDs
    if (missingProducts.length > 0) {
      return res.status(400).json({
        message: `Products with IDs ${missingProducts.join(", ")} not found`
      });
    }

    // Assign the generated orderId and email
    newOrderData.orderedItems = newProductArray;
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;

    // Create and save the new order
    const order = new Order(newOrderData);
    const savedOrder = await order.save();

    res.json({
      message: "Order created successfully",
      order: savedOrder
    });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: error.message });
  }
}

//End of create order



export async function getOrders(req, res) {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ email: req.user.email });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function getQuote(req, res) {
  try {
    const newOrderData = req.body;
    const newProductArray = [];
    let total = 0;
    let labeledTotal = 0;

    console.log(req.body);

    // Iterate through the ordered items to fetch product details
    for (const item of newOrderData.orderedItems) {
      const product = await Product.findOne({ productId: item.productId });

      // Handle case where product is not found
      if (!product) {
        return res.status(404).json({
          message: `Product with ID ${item.productId} not found`,
        });
      }

      // Calculate totals
      labeledTotal += product.price * item.qty;
      total += product.lastPrice * item.qty;

      // Prepare product array for response
      newProductArray.push({
        name: product.productName,
        price: product.lastPrice,
        labeledPrice: product.price,
        quantity: item.qty,
        image: product.images[0],
      });
    }

    console.log(newProductArray);

    // Final response with calculated totals and product details
    return res.json({
      orderedItems: newProductArray,
      total,
      labeledTotal,
    });
  } catch (error) {
    console.error("Error in getQuote:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}


