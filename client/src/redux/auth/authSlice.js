import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
