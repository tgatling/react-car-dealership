import React, { useEffect, useState } from 'react';

import { Car } from '../models/car';
import CarTable from '../components/car/CarTable';
import carService from '../services/car.service';

const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  console.log('Home');

  useEffect(() => {
    carService
      .getCars()
      .then((result) => {
        // convert results to format of car array
        let loadedCars: Car[] = [];
        for (const key in result) {
          loadedCars.push({
            carId: key,
            owner: result[key].owner,
            make: result[key].make,
            model: result[key].model,
            price: result[key].price,
            url: result[key].url,
          });
        }
        setCars(loadedCars);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <CarTable cars={cars} />
    </div>
  );
};

export default Home;
