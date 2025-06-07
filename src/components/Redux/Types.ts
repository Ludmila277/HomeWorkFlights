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

export interface RootState {
  flights: FlightsState;
}
