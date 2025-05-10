// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProductToCart: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

// Aksiyonları dışa aktar
export const { addProductToCart, reset } = cartSlice.actions;

// Reducer'ı dışa aktar
export default cartSlice.reducer;
