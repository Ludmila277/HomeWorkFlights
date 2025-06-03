import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { loadMoreFlights } from "../Redux/FlightsSlice";
import "./FlightCard.css";

interface FlightCardProps {
  price: number;
  route: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  image: string;
}

function FlightCard({
  price,
  route,
  departureTime,
  arrivalTime,
  duration,
  stops,
  image,
}: FlightCardProps) {
  return (
    <div className="tickets">
      <div className="ticket_container">
        <div className="price">{price} Р</div>
        <div className="route">{route}</div>
        <div className="times">
          {departureTime} - {arrivalTime}
        </div>
      </div>
      <div className="ticket_container__way">
        <span className="duration_description">В пути </span>
        <div className="duration">{duration}</div>
      </div>
      <div className="ticket_container__transfers">
        <img src={image} alt="Flight Info" className="flight_image" />
        <span className="stops_description">Пересадки </span>
        <div className="stops">{stops}</div>
      </div>
    </div>
  );
}

const DownloadButton: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.flights.isLoading);
  const flightsCount = useSelector(
    (state: RootState) => state.flights.list.length
  );
  const totalFlights = useSelector((state: RootState) => state.flights.total);

  const handleLoadMore = () => {
    if (!isLoading && flightsCount < totalFlights) {
      dispatch(loadMoreFlights());
    }
  };

  return (
    <footer className="footer">
      <button
        className="load-more-button"
        disabled={isLoading || flightsCount >= totalFlights}
        onClick={handleLoadMore}
      >
        {isLoading ? "Загрузка рейсов..." : "Загрузить еще билеты"}
      </button>
    </footer>
  );
};

export { FlightCard, DownloadButton };
