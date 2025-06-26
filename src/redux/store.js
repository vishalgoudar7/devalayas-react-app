import { configureStore } from "@reduxjs/toolkit";
import templeReducer from "./templeSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    temple: templeReducer,
    cart: cartReducer,
  },
});
