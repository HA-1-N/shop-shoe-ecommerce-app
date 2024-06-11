import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import { authReducer } from "./features/auth.slice";
import { cartReducer } from "./features/cart.slice";
import productSlice from "./features/product.slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authReducer,
    cart: cartReducer,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
