import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import type { RootState } from '../Redux/Store';
import { loadMoreFlights } from '../../components/Redux/FlightsSlice';
import type { AppDispatch } from '../Redux/Store';
import "./Footer.css"

const Footer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.flights.isLoading);
  const flightsCount = useSelector((state: RootState) => state.flights.list.length);
  const totalFlights = useSelector((state: RootState) => state.flights.total);

  const handleLoadMore = async () => {
    if (!isLoading && flightsCount < totalFlights) {
      dispatch(loadMoreFlights());
    }
  };

  return (
    <button
      className="load-more-button"
      disabled={isLoading || flightsCount >= totalFlights}
      onClick={handleLoadMore}
    >
      {isLoading ? 'Загрузка...' : 'Загрузить еще билеты'}
    </button>
  );
};

export default Footer;