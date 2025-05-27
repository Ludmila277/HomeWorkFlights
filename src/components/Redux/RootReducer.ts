import { combineReducers } from "@reduxjs/toolkit";
import flightsReducer from "./FlightsSlice";

const rootReducer = combineReducers({
  flights: flightsReducer,
});

export default rootReducer;
