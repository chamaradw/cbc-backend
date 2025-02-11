import mongoose from "mongoose";
import Wishlist from "../models/Wishlist.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product || !product.productId) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [product] });
      await wishlist.save();
    } else {
      const productExists = wishlist.products.some(
        (item) =>
          item.productId.toString() ===
          mongoose.Types.ObjectId(product.productId).toString()
      );

      if (!productExists) {
        wishlist.products.push(product);
        await wishlist.save();
      }
    }

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (item) =>
        item.productId.toString() !==
        mongoose.Types.ObjectId(productId).toString()
    );
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "products.productId"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
