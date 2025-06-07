import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import flight1 from "../../assets/победа.svg";
import flight2 from "../../assets/red wings.svg";
import flight3 from "../../assets/airlines.svg";
import type { RootState } from "./Types";

export interface Flight {
  id: number;
  price: number;
  route: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  airlineId: number;
  image: string;
}

export interface FlightsState {
  status: "idle" | "loading" | "success" | "failed";
  list: Flight[];
  filteredList: Flight[];
  total: number;
  isLoading: boolean;
  sortType: "price" | "duration" | "stops";
  selectedStops: number[];
  selectedAirlines: number[];
}

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

const generateRandomFlight = (): Flight => {
  const id = Math.max(...initialState.list.map((f) => f.id), 0) + 1;
  const price = Math.floor(Math.random() * (25000 - 10000) + 10000);
  const route = ["SVO - LED", "DME - AER", "SVO - AER", "DME - LED"][
    Math.floor(Math.random() * 4)
  ];
  const departureTime = `${Math.floor(Math.random() * 24)}:${Math.floor(
    Math.random() * 60
  )
    .toString()
    .padStart(2, "0")}`;
  const duration = `${Math.floor(Math.random() * 10)} ч ${Math.floor(
    Math.random() * 60
  )} мин`;
  const stops = Math.floor(Math.random() * 4);
  const airlineId = Math.floor(Math.random() * 3) + 1;
  const image = [flight1, flight2, flight3][Math.floor(Math.random() * 3)];

  return {
    id,
    price,
    route,
    departureTime,
    arrivalTime: `${
      parseInt(departureTime.split(":")[0]) + parseInt(duration.split(" ч ")[0])
    }:${departureTime.split(":")[1]}`,
    duration,
    stops,
    airlineId,
    image,
  };
};

const fetchFlights = async (isInitialLoad: boolean): Promise<Flight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isInitialLoad) {
        resolve([
          {
            id: 1,
            price: 12680,
            route: "SVO - LED",
            departureTime: "12:00",
            arrivalTime: "16:30",
            duration: "4 ч 30 мин",
            stops: 1,
            airlineId: 1,
            image: flight1,
          },
          {
            id: 2,
            price: 21500,
            route: "SVO - LED",
            departureTime: "14:00",
            arrivalTime: "16:30",
            duration: "2 ч 0 мин",
            stops: 0,
            airlineId: 2,
            image: flight2,
          },
          {
            id: 3,
            price: 23995,
            route: "SVO - LED",
            departureTime: "04:50",
            arrivalTime: "13:30",
            duration: "8 ч 40 мин",
            stops: 2,
            airlineId: 3,
            image: flight3,
          },
        ]);
      } else {
        resolve(Array.from({ length: 3 }, () => generateRandomFlight()));
      }
    }, 1000);
  });
};
export const loadFlights = createAsyncThunk<
  Flight[],
  void,
  { rejectValue: string }
>("flights/load", async () => {
  return fetchFlights(true);
});

export const loadMoreFlights = createAsyncThunk<
  Flight[],
  void,
  { rejectValue: string }
>("flights/loadMore", async () => {
  return fetchFlights(false);
});

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    resetFlights: () => initialState,
    setSortType: (
      state,
      action: PayloadAction<"price" | "duration" | "stops">
    ) => {
      state.sortType = action.payload;
    },
    setSelectedStops: (state, action: PayloadAction<number[]>) => {
      state.selectedStops = action.payload;
    },
    setSelectedAirlines: (state, action: PayloadAction<number[]>) => {
      state.selectedAirlines = action.payload;
    },
    applyFilters: (state) => {
      let filtered = state.list;
      if (state.selectedStops.length > 0) {
        filtered = filtered.filter((flight) =>
          state.selectedStops.includes(flight.stops)
        );
      }
      if (state.selectedAirlines.length > 0) {
        filtered = filtered.filter((flight) =>
          state.selectedAirlines.includes(flight.airlineId)
        );
      }

      const parseDuration = (durationString: string): number => {
        const [hours, minutes] = durationString.split(" ч ").map(Number);
        return (hours || 0) * 60 + (minutes || 0);
      };

      switch (state.sortType) {
        case "price":
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
        case "duration":
          filtered = filtered.sort((a, b) => {
            const durA = parseDuration(a.duration);
            const durB = parseDuration(b.duration);
            return durA - durB;
          });
          break;
        case "stops":
          filtered = filtered.sort((a, b) => a.stops - b.stops);
          break;
      }

      state.filteredList = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFlights.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(
        loadFlights.fulfilled,
        (state, action: PayloadAction<Flight[]>) => {
          state.status = "success";
          state.list = action.payload;
          state.total = action.payload.length * 4;
          state.isLoading = false;
          state.filteredList = state.list;
        }
      )
      .addCase(loadFlights.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      })
      .addCase(loadMoreFlights.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(
        loadMoreFlights.fulfilled,
        (state, action: PayloadAction<Flight[]>) => {
          state.status = "success";
          state.list = [...state.list, ...action.payload];

          const newFiltered = action.payload.filter((flight) => {
            return (
              (state.selectedStops.length === 0 ||
                state.selectedStops.includes(flight.stops)) &&
              (state.selectedAirlines.length === 0 ||
                state.selectedAirlines.includes(flight.airlineId))
            );
          });

          const combinedFiltered = [...state.filteredList, ...newFiltered];

          const parseDuration = (durationString: string): number => {
            const [hours, minutes] = durationString.split(" ч ").map(Number);
            return (hours || 0) * 60 + (minutes || 0);
          };

          switch (state.sortType) {
            case "price":
              combinedFiltered.sort((a, b) => a.price - b.price);
              break;
            case "duration":
              combinedFiltered.sort((a, b) => {
                const durA = parseDuration(a.duration);
                const durB = parseDuration(b.duration);
                return durA - durB;
              });
              break;
            case "stops":
              combinedFiltered.sort((a, b) => a.stops - b.stops);
              break;
          }

          state.filteredList = combinedFiltered;
          state.isLoading = false;
        }
      )
      .addCase(loadMoreFlights.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      });
  },
});

export const {
  resetFlights,
  setSortType,
  setSelectedStops,
  setSelectedAirlines,
  applyFilters,
} = flightsSlice.actions;

export default flightsSlice.reducer;

export const selectFlights = (state: RootState) => state.flights;
export const selectFilteredFlights = (state: RootState) =>
  state.flights.filteredList;
export const selectIsLoading = (state: RootState) => state.flights.isLoading;

export const selectTotalFlights = (state: RootState) => state.flights.total;
export const selectSortType = (state: RootState) => state.flights.sortType;
export const selectSelectedStops = (state: RootState) =>
  state.flights.selectedStops;
export const selectSelectedAirlines = (state: RootState) =>
  state.flights.selectedAirlines;
