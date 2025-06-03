import { configureStore, combineReducers } from "@reduxjs/toolkit";
import flightsReducer from "./FlightsSlice";

const rootReducer = combineReducers({
  flights: flightsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
