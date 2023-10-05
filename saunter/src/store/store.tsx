import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "./routesSlice";

export const store = configureStore({
  reducer: routesReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
