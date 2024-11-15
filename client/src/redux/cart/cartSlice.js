import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isLoading: false,
  isSucess: "",
  isError: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartSuccess: (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
      state.success = true;
    },
    resetCart: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.message = action.payload;
    },
  },
});

export const { resetCart, cartSuccess, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
