import React, { useEffect } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import CarTable from '../../components/car/CarTable';

import { DEALER_ROLE } from '../../models/constants';

interface homeProps {
  editMode: boolean;
}

const Home = ({ editMode }: homeProps) => {
  const carsState = useSelector((state: RootStateOrAny) => state.car.cars);

  useEffect(() => {}, [carsState]);

  return (
    <div>
      <CarTable editMode={editMode} cars={carsState} owner={DEALER_ROLE} />
    </div>
  );
};

export default Home;
