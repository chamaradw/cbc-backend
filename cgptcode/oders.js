import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderID:{
    type: String, 
    required: true,},
  
  user: { //email of the user
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true 
  }, // Reference to the user placing the order

  Oedereditems: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "products", 
        required: true 
      }, // Reference to the product
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      }, // Quantity of the product
      price: { 
        type: Number, 
        required: true 
      } // Price of the product at the time of order
    }
  ], // List of products in the order
  totalAmount: { 
    type: Number, 
    required: true 
  }, // Total cost of the order
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  }, // Address for shipping the order
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ["Credit Card", "PayPal", "COD"] 
  }, // Payment method used for the order
  paymentStatus: { 
    type: String, 
    default: "Pending", 
    enum: ["Pending", "Paid", "Failed"] 
  }, // Payment status of the order
  orderStatus: { 
    type: String, 
    default: "Processing", 
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"] 
  }, // Current status of the order
  orderDate: { 
    type: Date, 
    default: Date.now 
  }, // Date when the order was placed
  deliveredAt: { 
    type: Date 
  }, // Date when the order was delivered
  updatedAt: { 
    type: Date 
  } // Date when the order status was last updated
});

const Order = mongoose.model("orders", orderSchema);

export default Order;
