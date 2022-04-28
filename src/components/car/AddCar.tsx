import React from 'react';
import { useDispatch } from 'react-redux';

import carService from '../../services/car.service';
import CarForm from './CarForm';

import { DEALER_ROLE } from '../../models/constants';
import { carActions } from '../../store/car-slice';
import { Car } from '../../models/car';

const AddCar = () => {
  const dispatch = useDispatch();
  const todaysDate = new Date().toISOString();

  const addCarToLot = (
    car: Car,
    setError: (error: string) => void,
    setCarId: (id: string) => void,
    setCarAdded: (added: boolean) => void
  ) => {
    carService
      .addCar(car)
      .then((response) => {
        // add car to redux car state
        dispatch(
          carActions.addCarToDealership({
            car: {
              owner: DEALER_ROLE,
              year: car.year,
              make: car.make,
              model: car.model,
              url: car.url,
              price: car.price,
              carId: response.name,
              dateAdded: todaysDate,
            },
          })
        );

        // display confirmation after adding car
        setCarId(response.name);
        setCarAdded(true);
      })
      .catch((error) => setError(error));
  };
  return <CarForm addCarForm={true} addCarToLot={addCarToLot} />;
};

export default AddCar;
