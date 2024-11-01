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
  sizes: {
    type: [String],
  },
  img: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
