const mongoose = require('mongoose');

// Wishlist schema
const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
