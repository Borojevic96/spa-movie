import { configureStore } from "@reduxjs/toolkit";
import movieSpaReducer from "./reducer/app.ts";

export const store = configureStore({
  reducer: {
    [movieSpaReducer.name]: movieSpaReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
