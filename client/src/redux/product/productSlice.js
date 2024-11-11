import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  issuccess: false,
  isError: false,
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productSuccess: (state, action) => {
      state.products = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
});

export const { productSuccess, reset } = productSlice.actions;
export default productSlice.reducer;
