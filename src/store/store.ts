import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import reviewsReducer from "../features/reviewSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews:reviewsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
