


import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Review", reviewSchema);
