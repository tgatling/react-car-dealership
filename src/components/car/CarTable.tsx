import React from 'react';

import { DUMMY_CARS } from '../../models/dummyCars';
import CarItem from './CarItem';
import styles from './CarTable.module.css';

const CarTable = () => {
  return (
    <div className={styles.table}>
      {DUMMY_CARS.map((car) => {
        return (
          <CarItem
            key={car.carId}
            carId={car.carId}
            make={car.make}
            model={car.model}
            price={car.price}
            url={car.url}
          />
        );
      })}
    </div>
  );
};

export default CarTable;
