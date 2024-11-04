import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{ product_id: mongoose.Schema.Types.ObjectId, quantity: Number }],
});

export default mongoose.model("Cart", cartSchema);
