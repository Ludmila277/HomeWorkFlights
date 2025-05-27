export interface Flight {
  price: number;
  route: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  image: string;
}

export interface StopOption {
  id: number;
  label: string;
}

export interface AirlineOption {
  id: number;
  name: string;
}
