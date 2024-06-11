import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
  loading: false,
  error: null,
  countCartIncrement: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state, action) => {
    //   state.cart.push(action.payload);
    //   state.total += action.payload.product.price * action.payload.quantity;
      state.countCartIncrement += 1;
    },
    decrementCart: (state, action) => {
    //   const index = state.cart.findIndex(
    //     (item) => item.product.id === action.payload.id
    //   );
    //   state.total -=
    //     state.cart[index].product.price * state.cart[index].quantity;
    //   state.cart.splice(index, 1);
    },
  },
});

export const { incrementCart, decrementCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
