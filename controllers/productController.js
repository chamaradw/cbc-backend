import Product from "../models/product.js";
import { isAdmin } from "./userController.js";
import mongoose from 'mongoose';

export async function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(401).json({ message: "Please login as an administrator to add products" });
    return;
  }

  const newProductData = req.body;

  try {
    const product = new Product(newProductData);
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      res.status(404).json({ message: "No products found." });
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(401).json({ message: "Please login as an administrator to update products" });
    return;
  }

  const { productId } = req.params;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate({ productId }, updatedProductData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



export async function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: "Please login as an administrator to delete products" });
  }

  const { productId } = req.params;

  // Validate the productId as a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function getProductsById(req, res) {
  const { productId } = req.params;

  try {
    // Corrected query: pass an object with the field to match
    const product = await Product.findOne({ productId });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
}



export async function searchProducts(req, res) {
  const query = req.params.query;
  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { altNames: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
}



export async function getProductsByCategory(req, res) {
  const { category } = req.query;  // Extract category from query params

  console.log("Received query:", req.query);  // Log the full query params

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    // Clean category name to be case-insensitive and trim any extra spaces
    const cleanCategory = category.trim().toLowerCase();
    console.log("Cleaned category:", cleanCategory);  // Debugging log

    // Log the query being sent to MongoDB
    const query = { category: { $regex: cleanCategory, $options: 'i' } };
    console.log("MongoDB query:", query);

    const products = await Product.find(query);

    if (products.length === 0) {
      console.log("No products found for category:", cleanCategory);  // Log when no products are found
      return res.status(404).json({ message: "No products found in this category." });
    }

    console.log("Products found:", products.length);  // Log the number of products found

    return res.status(200).json(products);  // Return filtered products
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
