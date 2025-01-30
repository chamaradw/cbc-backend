import { Schema, model } from 'mongoose';

// Wishlist schema
const wishlistSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true,},
    products: [
{
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: { type: String, required: true },
        images: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Wishlist = model('Wishlist', wishlistSchema);

export default Wishlist;
