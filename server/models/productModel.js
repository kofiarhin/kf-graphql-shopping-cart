import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    reqwuired: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
  },
  img: {
    type: String,
  },
  category: {
    type: String,
  },
  sizes: {
    type: [String],
    default: ["s", "m", "l", "xl"],
  },
});

export default mongoose.model("Product", productSchema);
