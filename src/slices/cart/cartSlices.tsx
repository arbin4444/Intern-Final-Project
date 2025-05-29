import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookTypes } from "../../types/books/bookTypes";

interface Cart extends BookTypes {
  quantity: number;
}

interface CartState {
  items: Cart[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<BookTypes>) {
      const book = action.payload;
      const existingItem = state.items.find((item) => item.id === book.id);

      if (!existingItem) {
        state.items.push({ ...book, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
    state.items = state.items.filter(item => item.id !== action.payload);
  },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
