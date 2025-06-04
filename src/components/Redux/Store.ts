import { configureStore, combineReducers } from "@reduxjs/toolkit";
import flightsReducer from "./FlightsSlice";
import type { FlightsState } from "./Types";

const rootReducer = combineReducers({
  flights: flightsReducer,
});

const initialState: FlightsState = {
  status: "idle",
  list: [],
  filteredList: [],
  total: 0,
  isLoading: false,
  sortType: "price",
  selectedStops: [],
  selectedAirlines: [],

};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    flights: initialState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
