import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
