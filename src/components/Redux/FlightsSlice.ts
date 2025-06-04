import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import flight1 from "../../assets/победа.svg";
import flight2 from "../../assets/red wings.svg";
import flight3 from "../../assets/airlines.svg";

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

const fetchFlights = async (): Promise<Flight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
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
    }, 1000);
  });
};

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

          // Применяем фильтры к новым билетам
          const newFiltered = action.payload.filter((flight) => {
            return (
              (state.selectedStops.length === 0 ||
                state.selectedStops.includes(flight.stops)) &&
              (state.selectedAirlines.length === 0 ||
                state.selectedAirlines.includes(flight.airlineId))
            );
          });

          // Объединяем с существующими отфильтрованными
          const combinedFiltered = [...state.filteredList, ...newFiltered];

          // Применяем сортировку
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
