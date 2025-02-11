import mongoose from "mongoose";
import Wishlist from "../models/wishlist.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { email, product } = req.body;
  console.log(req.body);

  if (!email || !product || !product.productId) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    let wishlist = await Wishlist.findOne({ email });

    if (!wishlist) {
      wishlist = new Wishlist({ email, products: [product] });
      await wishlist.save();
    } else {
      const productExists = wishlist.products.some(
        (item) => item.productId === product.productId
      );

      if (!productExists) {
        wishlist.products.push(product);
        await wishlist.save();
      }
    }

    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { email, productId } = req.body;

  if (!email || !productId) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    let wishlist = await Wishlist.findOne({ email });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.productId !== productId
    );
    await wishlist.save();

    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  const { email } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ email }).populate(
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
