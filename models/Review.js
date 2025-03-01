import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {type: String, required: true},
    userName: {type: String,required: true,trim: true,},
    rating: {type: Number,required: true,min: 1,max: 5,},
    comment: {type: String,required: true,trim: true,},
    isHidden: {type: Boolean,default: false,},
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
