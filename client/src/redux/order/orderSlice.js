import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  messagee: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderSuccess: (state, action) => {
      state.orders = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    },
  },
});

export const { orderSuccess } = orderSlice.actions;
export default orderSlice.reducer;
