import React from "react";
import "./Main.css";
import type { Flight } from "../Redux/Types";
const FlightCard: React.FC<Flight> = ({
  price,
  route,
  departureTime,
  arrivalTime,
  duration,
  stops,
  image,
}) => {
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
};

export default FlightCard;