import { Schema, model } from 'mongoose';

// Wishlist schema
const wishlistSchema = new Schema(
  {
    email: {type: Schema.Types.ObjectId, ref: 'user', required: true,},
    products: [
{
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        productName: { type: String, required: true },
        images: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Wishlist = model('Wishlist', wishlistSchema);

export default Wishlist;
