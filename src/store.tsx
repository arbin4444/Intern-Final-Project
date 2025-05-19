import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { signupService } from "./service/signupService/signupService";

export const Store = configureStore({
  reducer: {
    [signupService.reducerPath]: signupService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signupService.middleware),
});

setupListeners(Store.dispatch);
