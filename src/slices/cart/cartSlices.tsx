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
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
