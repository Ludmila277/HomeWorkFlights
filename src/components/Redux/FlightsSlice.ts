import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Flight } from "./Types";
import type { PayloadAction } from "@reduxjs/toolkit";

const fetchFlights = async (): Promise<Flight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          price: 12680,
          route: "SVO - LED",
          departureTime: "12:00",
          arrivalTime: "16:30",
          duration: "4 ч 30 мин",
          stops: "1 пересадка",
          image: "победа.svg",
        },
        {
          price: 21500,
          route: "SVO - LED",
          departureTime: "14:00",
          arrivalTime: "16:00",
          duration: "2 ч 0 мин",
          stops: "Без пересадок",
          image: "red wings.svg",
        },
        {
          price: 23995,
          route: "SVO - LED",
          departureTime: "04:50",
          arrivalTime: "13:30",
          duration: "8 ч 40 мин",
          stops: "2 пересадки",
          image: "airlines.svg",
        },
      ]);
    }, 1000);
  });
};

export const loadFlights = createAsyncThunk<
  Flight[],
  void,
  { rejectValue: string }
>("flights/load", async () => {
  return fetchFlights();
});

export const loadMoreFlights = createAsyncThunk<
  Flight[],
  void,
  { rejectValue: string }
>("flights/loadMore", async () => {
  return fetchFlights();
});

interface FlightsState {
  list: Flight[];
  total: number;
  isLoading: boolean;
}

const initialState: FlightsState = {
  list: [],
  total: 0,
  isLoading: false,
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    resetFlights: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadFlights.fulfilled,
        (state, action: PayloadAction<Flight[]>) => {
          state.list = action.payload;
          state.total = action.payload.length;
          state.isLoading = false;
        }
      )
      .addCase(loadMoreFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadMoreFlights.fulfilled,
        (state, action: PayloadAction<Flight[]>) => {
          state.list = [...state.list, ...action.payload];
          state.total = state.list.length;
          state.isLoading = false;
        }
      );
  },
});


export const { resetFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
