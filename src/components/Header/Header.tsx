import React, { useState } from "react";
import Logo from "../../assets/plane.svg";
import "./Header.css";

type StopOption = {
  id: number;
  label: string;
};

const stopsOptions: StopOption[] = [
  { id: 0, label: "Без пересадок" },
  { id: 1, label: "1 пересадка" },
  { id: 2, label: "2 пересадки" },
  { id: 3, label: "3 пересадки" },
];

type AirlineOption = {
  id: number;
  name: string;
};

const airlinesOptions: AirlineOption[] = [
  { id: 1, name: "Победа" },
  { id: 2, name: "Red Wings" },
  { id: 3, name: "S7 Airlines" },
];

const Header: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveButton(index);
  };

  const handleStopSelect = (stopId: number) => {
    setSelectedStop(stopId);
  };

  const handleAirlineSelect = (airlineId: number) => {
    setSelectedAirline(airlineId);
  };

  return (
    <div className="header">
      <div className="logotype">
        <img className="logo" src={Logo} alt="plane" />
        <h3 className="title">Поиск авиабилетов</h3>
      </div>
      <div className="menu">
        <button
          className={`menu_button ${activeButton === 0 ? "active" : ""}`}
          onClick={() => handleClick(0)}
        >
          <span className="button-text">Самый дешевый</span>
        </button>
        <button
          className={`menu_button ${activeButton === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          <span className="button-text">Самый быстрый</span>
        </button>
        <button
          className={`menu_button ${activeButton === 2 ? "active" : ""}`}
          onClick={() => handleClick(2)}
        >
          <span className="button-text">Самый оптимальный</span>
        </button>
      </div>
      <div className="stops-selector">
        <div className="options">
          <h3 className="menu_title">Количество пересадок</h3>
          {stopsOptions.map((option) => (
            <div
              key={option.id}
              className={`option ${
                selectedStop === option.id ? "selected" : ""
              }`}
              onClick={() => handleStopSelect(option.id)}
            >
              <div className="checkbox">
                {selectedStop === option.id && (
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
          {airlinesOptions.map((airline) => (
            <div
              key={airline.id}
              className={`airline ${
                selectedAirline === airline.id ? "selected" : ""
              }`}
              onClick={() => handleAirlineSelect(airline.id)}
            >
              <div
                className={`circle ${
                  selectedAirline === airline.id ? "selected" : ""
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
