import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./FlightsSlice";

const initialState = {
  flights: {
    list: [],
    total: 0,
    isLoading: false,
  },
};

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
  },
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
