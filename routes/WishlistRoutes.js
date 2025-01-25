import { Router } from 'express';
import mongoose from 'mongoose';
import Wishlist from '../models/Wishlist.js';
const router = Router();

// Add product to wishlist
router.post('/add', async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product || !product.productId) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    // Find wishlist by userId
    let wishlist = await Wishlist.findOne({ userId });

    // If wishlist doesn't exist, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [product],
      });
      await wishlist.save();
    } else {
      // Check if product already exists in wishlist
      const productExists = wishlist.products.some(
        (item) => item.productId.toString() === mongoose.Types.ObjectId(product.productId).toString()
      );

      if (!productExists) {
        wishlist.products.push(product);
        await wishlist.save();
      }
    }

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Remove product from wishlist
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== mongoose.Types.ObjectId(productId).toString()
    );
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all products in wishlist
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('products.productId');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
