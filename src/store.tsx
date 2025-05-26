import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { signupService } from "./service/signupService/signupService";
import {booksApi} from "./service/bookService/bookService"
import {loginService} from "./service/loginService/loginService"
import cartReducer from "./slices/cart/cartSlices"
export const Store = configureStore({
  reducer: {
    [signupService.reducerPath]: signupService.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [loginService.reducerPath]: loginService.reducer,
     cart: cartReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signupService.middleware).concat(booksApi.middleware).concat(loginService.middleware),
});

setupListeners(Store.dispatch);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
