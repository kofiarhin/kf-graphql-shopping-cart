import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import messageReducer from "./message/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    message: messageReducer,
  },
});

export default store;
