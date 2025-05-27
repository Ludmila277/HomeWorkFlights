import { useSelector } from 'react-redux';
import type { RootState } from './components/Redux/Store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FlightCard from "./components/Main/Main"
import type { Flight } from './components/Redux/Types';
function App() {
  const flights = useSelector((state: RootState) => state.flights.list);

  if (flights.length === 0) {
    return <div>Загрузка рейсов...</div>;
  }

  return (
    <div className="app">
      <Header />
      <div className="wrapper">
        {flights.map((flight: Flight, index: number) => (
          <FlightCard
            key={index}
            price={flight.price}
            route={flight.route}
            departureTime={flight.departureTime}
            arrivalTime={flight.arrivalTime}
            duration={flight.duration}
            stops={flight.stops}
            image={flight.image}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;