import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./components/Redux/Store";
import Header from "./components/Header/Header";
import { DownloadButton, FlightCard } from "./components/Main/FlightCard";
import type { Flight } from "./components/Redux/Types";
import { applyFilters, loadFlights } from "./components/Redux/FlightsSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const flights = useSelector((state: RootState) => state.flights.filteredList);
  const isLoading = useSelector(
    (state: RootState) => state.flights.status === "loading"
  );

  const selectedStops = useSelector(
    (state: RootState) => state.flights.selectedStops
  );
  const selectedAirlines = useSelector(
    (state: RootState) => state.flights.selectedAirlines
  );
  const sortType = useSelector((state: RootState) => state.flights.sortType);

  useEffect(() => {
    dispatch(loadFlights());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, selectedStops, selectedAirlines, sortType]);

  return (
    <div className="app">
      <Header />
      <div className="main">
        {isLoading ? (
          <div className="loading-indicator">
            <span>Загрузка рейсов</span>
            <div className="spinner"></div>
          </div>
        ) : (
          flights.map((flight: Flight) => (
            <FlightCard
              key={`${flight.id}-${flight.departureTime}`}
              price={flight.price}
              route={flight.route}
              departureTime={flight.departureTime}
              arrivalTime={flight.arrivalTime}
              duration={flight.duration}
              stops={flight.stops}
              image={flight.image}
            />
          ))
        )}
      </div>
      {flights.length > 0 && <DownloadButton />}
    </div>
  );
}

export default App;
