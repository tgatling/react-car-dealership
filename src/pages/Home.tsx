import React, { useEffect } from 'react';

import CarTable from '../components/car/CarTable';
import {DEALER_ROLE} from '../models/constants';
import {useSelector, RootStateOrAny} from 'react-redux';

interface homeProps {
  editMode: boolean;
}

const Home = ({editMode}: homeProps) => {
  const carState = useSelector((state: RootStateOrAny) => state.car);

  useEffect(()=>{},[carState]);

  return (
    <div>
      <CarTable editMode={editMode} cars={carState.cars} owner={DEALER_ROLE}/>
    </div>
  );
};

export default Home;
