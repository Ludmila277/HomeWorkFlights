import Logo from "../../assets/plane.svg";
import "./Header.css";
import {
  applyFilters,
  setSelectedAirlines,
  setSelectedStops,
  setSortType,
} from "../Redux/FlightsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import React from "react";
interface StopOption {
  id: number;
  label: string;
  key: string;
}

interface Airline {
  id: number;
  name: string;
  key: string;
}

interface FlightsState {
  sortType: "price" | "duration" | "stops";
  selectedStops: number[];
  selectedAirlines: number[];
}

const stopsOptions: StopOption[] = [
  { id: 0, label: "Без пересадок", key: "no-stops" },
  { id: 1, label: "1 пересадка", key: "one-stop" },
  { id: 2, label: "2 пересадки", key: "two-stops" },
  { id: 3, label: "3 пересадки", key: "three-stops" },
];

const airlinesOptions: Airline[] = [
  { id: 1, name: "Победа", key: "pobeda" },
  { id: 2, name: "Red Wings", key: "red-wings" },
  { id: 3, name: "S7 Airlines", key: "s7-airlines" },
];

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const {
    sortType = "price",
    selectedStops = [],
    selectedAirlines = [],
  }: FlightsState = useSelector((state: RootState) => state.flights);

  const handleSortClick = (type: "price" | "duration" | "stops") => {
    dispatch(setSortType(type));
    dispatch(applyFilters());
  };

  const handleStopSelect = (stopId: number) => {
    const isSelected = selectedStops.includes(stopId);
    const newStops = isSelected
      ? selectedStops.filter((id) => id !== stopId)
      : [...selectedStops, stopId];
    dispatch(setSelectedStops(newStops));
    dispatch(applyFilters());
  };

  const handleAirlineSelect = (airlineId: number) => {
    const isSelected = selectedAirlines.includes(airlineId);
    const newAirlines = isSelected
      ? selectedAirlines.filter((id) => id !== airlineId)
      : [...selectedAirlines, airlineId];
    dispatch(setSelectedAirlines(newAirlines));
    dispatch(applyFilters());
  };

  return (
    <div className="header">
      <div className="logotype">
        <img className="logo" src={Logo} alt="plane" />
        <h3 className="title">Поиск авиабилетов</h3>
      </div>
      <div className="menu">
        <button
          className={`menu_button ${sortType === "price" ? "active" : ""}`}
          onClick={() => handleSortClick("price")}
        >
          <span className="button-text">Самый дешевый</span>
        </button>
        <button
          className={`menu_button ${sortType === "duration" ? "active" : ""}`}
          onClick={() => handleSortClick("duration")}
        >
          <span className="button-text">Самый быстрый</span>
        </button>
        <button
          className={`menu_button ${sortType === "stops" ? "active" : ""}`}
          onClick={() => handleSortClick("stops")}
        >
          <span className="button-text">Самый оптимальный</span>
        </button>
      </div>
      <div className="stops-selector">
        <div className="options">
          <h3 className="menu_title">Количество пересадок</h3>
          {stopsOptions.map((option: StopOption) => (
            <div
              key={option.key}
              className={`option ${
                selectedStops.includes(option.id) ? "selected" : ""
              }`}
              onClick={() => handleStopSelect(option.id)}
            >
              <div className="checkbox">
                {selectedStops.includes(option.id) && (
                  <span className="check-mark">✓</span>
                )}
              </div>
              <span className="label">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="airlines-selector">
        <div className="options">
          <h3 className="menu_title">Компании</h3>
          {airlinesOptions.map((airline: Airline) => (
            <div
              key={airline.key}
              className={`airline ${
                selectedAirlines.includes(airline.id) ? "selected" : ""
              }`}
              onClick={() => handleAirlineSelect(airline.id)}
            >
              <div
                className={`circle ${
                  selectedAirlines.includes(airline.id) ? "selected" : ""
                }`}
              ></div>
              <span className="airline-name">{airline.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
