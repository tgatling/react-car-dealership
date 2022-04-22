import React from 'react';
import CarForm from '../components/car/CarForm';

const EditCar = () => {
  let pendingOffer = false;

  // Determine if there are any pending offers on the car

  return <CarForm addCarForm={false} pendingOffer={pendingOffer}/>;
};

export default EditCar;
